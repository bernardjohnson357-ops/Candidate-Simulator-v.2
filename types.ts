// types.ts

// ---------------------------
// Quiz Types
// ---------------------------
export type QuizType = "multiple-choice" | "open-ended";

export interface QuizBase {
  id: string;          // unique identifier (e.g., "1A_q1")
  module: string;      // module ID (e.g., "1A", "2A")
  type: QuizType;      // question type
  question: string;    // prompt text
  answer: string;      // correct/expected answer
  explanation?: string;
}

export interface MultipleChoiceQuiz extends QuizBase {
  type: "multiple-choice";
  options: string[];
}

export interface OpenEndedQuiz extends QuizBase {
  type: "open-ended";
}

export type Quiz = MultipleChoiceQuiz | OpenEndedQuiz;  // ✅ this is exported

// ---------------------------
// Game State
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
  chatHistory: ChatMessage[];
}

// ---------------------------
// Chat Messages
// ---------------------------
export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  type?: "text" | "image" | "voice";
  attachmentUrl?: string;
}
