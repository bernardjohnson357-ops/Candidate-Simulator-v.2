// app/api/simulator/route.ts
import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import fs from "fs/promises";
import type { Quiz } from "@/types";

// ---------------------------
// User State
// ---------------------------
interface UserState {
  userId: string;
  path: "Independent" | "Party" | "thirdParty";
  filingOption: "signatures" | "filingFee";
  currentModule: string;
  cc: number;
  signatures: number;
  voterApproval: number;
  completedQuizzes: string[];
  fecFilings: string[];
}

const userDB = new Map<string, UserState>();

function getUserState(
  userId: string,
  path: UserState["path"],
  filingOption: UserState["filingOption"]
): UserState {
  if (!userDB.has(userId)) {
    const defaultState: UserState = {
      userId,
      path,
      filingOption,
      currentModule: "0",
      cc: 50,
      signatures: 0,
      voterApproval: 0,
      completedQuizzes: [],
      fecFilings: [],
    };
    userDB.set(userId, defaultState);
    return defaultState;
  }
  return userDB.get(userId)!;
}

function saveUserState(userId: string, state: UserState) {
  userDB.set(userId, state);
}

// ---------------------------
// OpenAI Setup
// ---------------------------
const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// ---------------------------
// Dynamic Quiz Generation
// ---------------------------
async function generateQuizzes(moduleId: string): Promise<Quiz[]> {
  const systemPrompt = await fs.readFile("./data/system_prompt.md", "utf-8");
  const master = await fs.readFile("./data/master_roadmap.md", "utf-8");
  const reference = await fs.readFile("./data/reference_roadmap.md", "utf-8");

  const prompt = `
You are an experienced federal campaign manager. 
Generate 1-3 quiz questions for module "${moduleId}" based ONLY on the following simulator roadmap and references. 
Output valid JSON array of Quiz objects matching this schema:

[
  {
    "id": "string",
    "module": "string",
    "type": "multiple-choice" | "open-ended",
    "prompt": "string",
    "options": ["string", ...], // only for multiple-choice
    "answer": "string",
    "explanation": "string"
  }
]

Master Roadmap:
${master}

Reference Roadmap:
${reference}
`;

  const response = await client.chat.completions.create({
    model: "gpt-5-mini",
    messages: [{ role: "user", content: prompt }],
  });

  const raw = response.choices[0].message?.content || "[]";
  try {
    return JSON.parse(raw) as Quiz[];
  } catch {
    console.error("Failed to parse AI quiz JSON:", raw);
    return [];
  }
}

// ---------------------------
// Answer Evaluation
// ---------------------------
function evaluateAnswer(
  quiz: Quiz,
  userAnswer: string
): { score: number; earnedCC: number; earnedSignatures: number } {
  let correct = false;

  if (quiz.type === "multiple-choice") {
    correct = userAnswer === quiz.answer;
  } else if (quiz.type === "open-ended") {
    const expectedWords = quiz.answer.toLowerCase().split(/\W+/).filter(w => w.length > 2);
    const userWords = userAnswer.toLowerCase().split(/\W+/);
    const matches = expectedWords.filter(word => userWords.includes(word)).length;
    correct = matches >= Math.ceil(expectedWords.length / 2);
  }

  const score = correct ? 100 : 60;
  const earnedCC = score === 100 ? 2 : 1;
  const earnedSignatures = score;

  return { score, earnedCC, earnedSignatures };
}

function updateUserState(user: UserState, quiz: Quiz, userAnswer: string) {
  const { score, earnedCC, earnedSignatures } = evaluateAnswer(quiz, userAnswer);

  user.cc += earnedCC;
  user.signatures += earnedSignatures;
  user.voterApproval = user.signatures / 100; // 100 signatures = 1%
  user.completedQuizzes.push(quiz.id);

  return { score, earnedCC, earnedSignatures, voterApproval: user.voterApproval };
}

// ---------------------------
// API Route
// ---------------------------
export async function POST(req: NextRequest) {
  try {
    const { userId, action, payload } = await req.json();
    const user = getUserState(
      userId,
      payload?.path || "thirdParty",
      payload?.filingOption || "signatures"
    );

    switch (action) {
      case "init": {
        // Generate first module quizzes
        const quizzes = await generateQuizzes(user.currentModule);
        return NextResponse.json({ quizzes, state: user });
      }

      case "completeQuiz": {
        const { quiz, answer } = payload; // quiz object returned by generateQuizzes
        const result = updateUserState(user, quiz, answer);

        // Generate AI narration for next steps
        const systemPrompt = await fs.readFile("./data/system_prompt.md", "utf-8");
        const narrationPrompt = `
You are a campaign manager guiding a candidate.
Current state: ${JSON.stringify(user)}
User just completed quiz "${quiz.id}" with score ${result.score}.
Narrate consequences and suggest the next task.
`;
        const narrationResp = await client.chat.completions.create({
          model: "gpt-5-mini",
          messages: [{ role: "user", content: narrationPrompt }],
        });

        const narration = narrationResp.choices[0].message?.content || "";

        saveUserState(userId, user);
        return NextResponse.json({ result, narration, state: user });
      }

      case "nextModule": {
        const { nextModule } = payload;
        user.currentModule = nextModule;
        saveUserState(userId, user);

        const quizzes = await generateQuizzes(nextModule);
        return NextResponse.json({ quizzes, state: user });
      }

      default:
        return NextResponse.json({ error: "Unknown action" }, { status: 400 });
    }
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
