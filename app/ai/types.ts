// ./app/ai/types.ts

export interface Scenario {
  title: string;
  description: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correct?: string;
}

export interface Task {
  id: string;
  type: "read" | "write" | "speak" | "quiz";
  prompt: string;
  questions?: QuizQuestion[];

  // Optional feedback mapping (A, B, C, D, etc.)
  feedback?: Record<string, string>;
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
  outcome?: string | { description: string };
  nextModule?: Module;
}

export interface CandidateState {
  office: "President" | "Senate" | "House";
  cc: number;
  signatures: number;
  approval: number;
  currentModuleId: string;
  threshold?: {
    cc: number;
    approval: number;
    sigs: number;
  };

  // Optional helper properties used at runtime
  lastAction?: string;
  candidateCoins?: number;
}
