// types.ts

export type QuizType = "multiple-choice" | "open-ended";

export interface QuizBase {
  id: string;        // unique identifier (e.g., "1A_q1")
  module: string;    // module ID (e.g., "1A", "2A")
  type: QuizType;    // question type
  question: string;  // the prompt text
  answer: string;    // correct answer or expected response
  explanation?: string; // optional feedback after answering
}

// Multiple-choice adds options
export interface MultipleChoiceQuiz extends QuizBase {
  type: "multiple-choice";
  options: string[];
}

// Open-ended has no options
export interface OpenEndedQuiz extends QuizBase {
  type: "open-ended";
}

export type Quiz = MultipleChoiceQuiz | OpenEndedQuiz;

// ---------------------------
// GameState type for simulator
// ---------------------------
export interface GameState {
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
