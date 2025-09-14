export type Branch = "Independent" | "Party" | "Write-In";

export type TaskType = "read" | "write" | "quiz" | "upload";

export interface Task {
  id: string;
  module: number;      // 0–15
  type: TaskType;
  content: string;
  quizId?: string;     // optional, for quizzes
}

export interface GameState {
  cc: number;                 // Candidate Coins
  signatures: number;
  voterApproval: number;      // %
  currentModule: number;
  currentTaskIndex: number;
  quizzesCompleted: string[];
  branch: Branch;
}
