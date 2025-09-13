// types.ts

export type QuizType = "multiple-choice" | "open-ended";

export interface QuizBase {
  id: string;
  module: string;
  type: QuizType;
  question: string;
  answer: string;
  explanation?: string;
}

export interface MultipleChoiceQuiz extends QuizBase {
  type: "multiple-choice";
  options: string[];
}

export interface OpenEndedQuiz extends QuizBase {
  type: "open-ended";
}

export type Quiz = MultipleChoiceQuiz | OpenEndedQuiz;

// ---------------------------
// Game state
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

// ---------------------------
// Chat message type
// ---------------------------
export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  type?: "text" | "image" | "voice";
  attachmentUrl?: string;
}
