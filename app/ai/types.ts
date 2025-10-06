// ./app/ai/types.ts
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
  scenarios?: { title: string; description: string }[];
  outcome?: string | { description: string }; // only declare once
  nextModule?: Module;
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
  scenarios?: { title: string; description: string }[];
  outcome?: string | { description: string }; // unified type
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
}
