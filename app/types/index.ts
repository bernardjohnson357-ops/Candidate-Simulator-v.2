export type Branch = "Independent" | "Party" | "Write-In";

export type TaskType = "read" | "write" | "quiz" | "upload";

export interface Task {
  id: string;             // Unique task ID
  module: number;         // Module number (0–15)
  type: TaskType;
  content: string;
  quizId?: string;        // Optional, for quiz tasks
}

export interface GameState {
  cc: number;                     // Candidate Coins
  signatures: number;             // Earned signatures
  voterApproval: number;          // Voter approval %
  currentModule: number;          // Current module
  currentTaskIndex: number;       // Task index in module
  quizzesCompleted: string[];     // Quiz IDs already completed
  branch: Branch;                 // Independent, Party, or Write-In
}
