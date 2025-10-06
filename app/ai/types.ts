// ./app/ai/types.ts
export interface CandidateState {
  office: "President" | "Senate" | "House";
  cc: number;
  signatures: number;
  approval: number;
  currentModuleId: string; // track module dynamically
  threshold: {
    cc: number;
    approval: number;
    sigs: number;
  };
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correct: number;
}

export interface Task {
  id: string;
  type: "read" | "write" | "speak" | "quiz";
  prompt: string;
  questions?: QuizQuestion[];
}

export interface Module {
  id: string;
  title: string;
  description?: string;
  tasks: Task[];
  narrator: string;
  readingSummary?: string[];
  sources?: string[];
}

export interface ModuleState {
  moduleId: string;
  completedTasks: number;
  totalTasks: number;
  ccChange: number;
  signaturesChange: number;
  approvalChange: number;
  finished: boolean;
}
