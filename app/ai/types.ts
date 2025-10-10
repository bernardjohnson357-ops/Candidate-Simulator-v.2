// app/ai/types.ts
export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correct: string | string[]; // 👈 allow either
}

export type TaskType = "read" | "quiz" | "choice" | "decision";

export interface Task {
  id: string;
  type: TaskType;
  prompt: string;
  options?: string[];       // quiz choices or office options
  answer?: string;          // correct answer (for quiz only)
  nextTaskId?: string;      // optional: go directly to next task
}

export interface Module {
  id: string;
  title: string;
  active: boolean;
  description: string;
  narrator: string;
  readingSummary: string[];
  tasks: Task[];
  purpose: string;
  scenarios: any[];
  outcome: any;
  nextModule?: {
    id: string;
    title: string;
    description: string;
  };
}

export interface CandidateState {
  office?: string;
  cc: number;           // Candidate Coins
  signatures: number;   // Number of signatures collected
  voterApproval: number; // % approval
  currentModuleId?: string;
  [key: string]: any;    // For any future dynamic stats
}
