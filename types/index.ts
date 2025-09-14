// types/index.ts

export interface GameState {
  currentModule: number;
  candidateCoins: number;
  signatures: number;
  voterApproval: number;
}

export type TaskType = "read" | "write" | "quiz" | "upload";

export interface Task {
  id: string;
  module: number;
  type: TaskType;
  content: string;
  quizId?: string;
}
