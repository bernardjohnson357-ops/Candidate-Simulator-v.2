export interface GameState {
  cc: number;
  signatures: number;
  voterApproval: number;
  currentModule: number;
  currentTaskIndex: number;
  quizzesCompleted: string[];
  branch: "Independent" | "Party" | "WriteIn";
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  type: "text" | "file";
}

export interface Quiz {
  id: string;
  module: number;
  type: "multiple-choice" | "open-ended";
  question: string;
  answer: string;
}

export type TaskType = "read" | "quiz" | "write" | "upload" | "speak";

export interface Task {
  module: number;
  type: TaskType;
  content: string;
  quizId?: string;
}
