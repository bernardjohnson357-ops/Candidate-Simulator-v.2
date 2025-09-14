// -----------------------------
// Types for Candidate Simulator
// -----------------------------

// Task types
export type TaskType = "read" | "write" | "quiz" | "upload";

// Quiz payload for quiz tasks
export interface Quiz {
  question: string;
  options: string[];
  answer: string;
}

// A single task in the simulator
export interface Task {
  id: string;
  module: number;
  type: TaskType;
  content: string;
  quiz?: Quiz; // Only for quiz tasks
}

// Game state tracked across the simulator
export interface GameState {
  candidateCoins: number;     // CC available
  signatures: number;         // Collected voter signatures
  voterApproval: number;      // Approval rating (percentage)
  currentModule: number;      // Active module
  currentTaskIndex: number;   // Position in current module
  quizzesCompleted: string[]; // IDs of completed quizzes
}
