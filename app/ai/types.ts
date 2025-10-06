// ./app/ai/types.ts

export interface QuizQuestion {
  question: string;
  options: string[];
  answer: string;
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
  outcome?: string | string[];
  nextModuleId?: string;
}

// ✅ The main player/candidate state (used in aiLoop and ChatSimulator)
export interface CandidateState {
  office: "President" | "Senate" | "House";
  cc: number; // Candidate Coins
  signatures: number;
  approval: number;
  currentModuleId: string;
}

// ❌ ModuleState is removed — no longer needed
