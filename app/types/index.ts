export type TaskType = "read" | "write" | "quiz" | "upload";

export interface Task {
  id: string;
  module: number;
  type: TaskType;
  content: string;
  quizId?: string;
}

export interface GameState {
  cc: number;
  signatures: number;
  voterApproval: number;
  currentModule: number;
  currentTaskIndex: number;
  quizzesCompleted: string[];
}
