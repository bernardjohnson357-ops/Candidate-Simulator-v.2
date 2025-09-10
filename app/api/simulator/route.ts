// app/api/simulator/route.ts
import { NextRequest, NextResponse } from "next/server";

interface UserState {
  userId: string;
  path: "Independent" | "Party" | "thirdParty";
  filingOption: "signatures" | "filingFee";
  currentModule: string;
  cc: number;
  signatures: number;
  completedQuizzes: string[];
  fecFilings: string[];
}

const userDB = new Map<string, UserState>();

// ---------------------------
// Utility helpers
// ---------------------------
function getUserState(userId: string, path: UserState["path"], filingOption: UserState["filingOption"]): UserState {
  if (!userDB.has(userId)) {
    const defaultState: UserState = {
      userId,
      path,
      filingOption,
      currentModule: "0",
      cc: 50,
      signatures: 0,
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

function evaluateQuiz(quizId: string, answers: any) {
  const score = Math.floor(Math.random() * 41) + 60; // 60-100
  const earnedCC = score === 100 ? 2 : 1;
  const earnedSignatures = Math.floor(score);
  return { score, earnedCC, earnedSignatures };
}

function checkFECTrigger(user: UserState): boolean {
  return user.cc >= 50 && !user.fecFilings.includes(user.currentModule);
}

function getNextStep(user: UserState) {
  // Branching logic based on path + filing option
  if (user.currentModule === "0") {
    if (user.path === "Independent" || user.path === "thirdParty") {
      if (user.filingOption === "signatures") {
        return {
          message: `Welcome! You chose path: ${user.path}, filing option: signatures.\n\nStep 1: Read Independent/Third-Party signature filing guide.\nStep 2: Take the Signature Verification Quiz.`,
          nextTask: "Signature Verification Quiz",
          currentModule: "1A",
        };
      } else {
        return {
          message: `Welcome! You chose path: ${user.path}, filing option: filing fee.\n\nStep 1: Read Independent/Third-Party filing fee guide.\nStep 2: Take the Filing Fee Quiz.`,
          nextTask: "Filing Fee Quiz",
          currentModule: "2A",
        };
      }
    }

    if (user.path === "Party") {
      return {
        message: `Welcome! You chose path: Party candidate.\n\nStep 1: Read Party filing guide.\nStep 2: Take the Party Filing Quiz.`,
        nextTask: "Party Filing Quiz",
        currentModule: "1B",
      };
    }
  }

  return {
    message: "Continue your current module or complete the next task.",
    nextTask: null,
    currentModule: user.currentModule,
  };
}

// ---------------------------
// API Route
// ---------------------------
export async function POST(req: NextRequest) {
  try {
    const { userId, action, payload } = await req.json();

    // Ensure we pass path + filingOption when initializing
    const user = getUserState(
      userId,
      payload?.path || "thirdParty",
      payload?.filingOption || "signatures"
    );

    switch (action) {
      case "init":
        return NextResponse.json(getNextStep(user));

      case "completeQuiz": {
        const { quizId, answers } = payload;
        const result = evaluateQuiz(quizId, answers);

        user.cc += result.earnedCC;
        user.signatures += result.earnedSignatures;
        user.completedQuizzes.push(quizId);

        let fecTriggered = false;
        let nextTask = null;

        if (checkFECTrigger(user)) {
          fecTriggered = true;
          nextTask = "FEC Filing Quiz";
          user.fecFilings.push(user.currentModule);
          user.currentModule += "_FECQuiz";
        }

        saveUserState(userId, user);

        return NextResponse.json({
          message: "Quiz completed",
          score: result.score,
          earnedCC: result.earnedCC,
          earnedSignatures: result.earnedSignatures,
          fecTriggered,
          nextTask,
          currentModule: user.currentModule,
          cc: user.cc,
          signatures: user.signatures,
        });
      }

      case "spendCC": {
        const { amount } = payload;
        if (amount > user.cc) {
          return NextResponse.json({ error: "Not enough CC" }, { status: 400 });
        }
        user.cc -= amount;

        let fecTriggered = false;
        let nextTask = null;

        if (checkFECTrigger(user)) {
          fecTriggered = true;
          nextTask = "FEC Filing Quiz";
          user.fecFilings.push(user.currentModule);
          user.currentModule += "_FECQuiz";
        }

        saveUserState(userId, user);

        return NextResponse.json({
          message: `Spent ${amount} CC`,
          cc: user.cc,
          fecTriggered,
          nextTask,
          currentModule: user.currentModule,
        });
      }

      case "nextModule": {
        const { nextModule } = payload;
        user.currentModule = nextModule;
        saveUserState(userId, user);

        return NextResponse.json({
          message: `Moved to module ${nextModule}`,
          currentModule: user.currentModule,
        });
      }

      default:
        return NextResponse.json({ error: "Unknown action" }, { status: 400 });
    }
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to process request", details: err },
      { status: 500 }
    );
  }
}
