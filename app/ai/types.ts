// app/ai/types.ts
export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correct: string[]; // ✅ FIXED: was string | number before
}

export interface Task {
  id: string;
  type: "read" | "quiz" | "decision";
  prompt: string;
  questions?: QuizQuestion[];
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
