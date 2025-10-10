// app/ai/types.ts
export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correct: string | string[]; // 👈 allow either
}

export type TaskType = "read" | "quiz" | "choice" | "decision" | "write" | "upload" | "speak";

export interface Task {
  id: string;
  type: TaskType;
  prompt: string;
  questions?: QuizQuestion[];
  responsePlaceholder?: string; // ✅ add this optional field
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
