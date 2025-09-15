// -----------------------------
// Types for Candidate Simulator
// -----------------------------

export type TaskType = "read" | "write" | "quiz" | "upload";

export interface Quiz {
  question: string;
  options: string[];
  answer: string;
}

export interface Task {
  id: string;
  module: number;
  type: TaskType;
  content: string;
  quiz?: Quiz;
}

export interface GameState {
  candidateCoins: number;     // CC available
  signatures: number;         // Collected voter signatures
  voterApproval: number;      // Approval rating (percentage)
  currentModule: number;      // Active module
  currentTaskIndex: number;   // Position in current module
  quizzesCompleted: string[]; // IDs of completed quizzes
}
