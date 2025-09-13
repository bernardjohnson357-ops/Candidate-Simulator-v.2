// app/api/simulator/route.ts
import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import fs from "fs";

// ✅ Import quiz data
import quizData from "../../../data/quizzes.json";
import type { Quiz } from "@/types"; // add Quiz type to types.ts

// ---------------------------
// Types + State
// ---------------------------
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
// Quiz Evaluation
// ---------------------------
function evaluateQuiz(quizId: string, answers: Record<string, string>) {
  const quiz: Quiz | undefined = (quizData as Quiz[]).find(q => q.id === quizId);

  if (!quiz) {
    return { score: 0, earnedCC: 0, earnedSignatures: 0, error: "Quiz not found" };
  }

  const isCorrect = answers[quiz.id] === quiz.answer;
  const score = isCorrect ? 100 : 60; // basic scoring
  const earnedCC = score === 100 ? 2 : 1;
  const earnedSignatures = score;

  return { score, earnedCC, earnedSignatures };
}
case "completeQuiz": {
  const { quizId, answers } = payload;
  const result = evaluateQuiz(quizId, answers);

  user.cc += result.earnedCC;
  user.signatures += result.earnedSignatures;
  user.completedQuizzes.push(quizId);

  let fecTriggered = false;
  if (checkFECTrigger(user)) {
    fecTriggered = true;
    user.fecFilings.push(user.currentModule);
    user.currentModule += "_FECQuiz";
  }

  saveUserState(userId, user);

  const narration = await runSimulatorAI(
    `User completed quiz ${quizId} with score ${result.score}. 
Update CC, signatures, and narrate next steps.`,
    user
  );

  return NextResponse.json({
    narration,
    score: result.score,
    earnedCC: result.earnedCC,
    earnedSignatures: result.earnedSignatures,
    fecTriggered,
    state: user,
  });
}

function checkFECTrigger(user: UserState): boolean {
  return user.cc >= 50 && !user.fecFilings.includes(user.currentModule);
}
function getQuizzesForModule(moduleId: string): Quiz[] {
  return (quizData as Quiz[]).filter(q => q.module === moduleId);
}
