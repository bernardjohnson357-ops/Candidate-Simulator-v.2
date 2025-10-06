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

export interface Scenario {
  title: string;
  description: string;
}

export interface Module {
  id: string;
  title: string;
  description: string;
  narrator?: string;
  readingSummary?: string[];
  sources?: string[];
  tasks: Task[];
  purpose?: string;
  scenarios?: Scenario[];
  outcome?: string | string[]; // ✅ Add this
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
