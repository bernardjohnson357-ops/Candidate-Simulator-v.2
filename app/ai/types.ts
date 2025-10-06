// ./app/ai/types.ts

// ------------------------------
// Candidate State
// ------------------------------
export interface CandidateState {
  office: "President" | "Senate" | "House";
  cc: number;
  signatures: number;
  approval: number;
  currentModuleId?: string; // tracks the current module
}

// ------------------------------
// Module State
// ------------------------------
export type ModuleState = {
  moduleId: string;
  completedTasks: number;
  totalTasks: number;
  ccChange: number;
  signaturesChange: number;
  approvalChange: number;
  finished: boolean;
};

// ------------------------------
// Quiz Question Structure
// ------------------------------
export interface QuizQuestion {
  question: string;
  options: string[];
  correct: number; // index of the correct answer in options
}

// ------------------------------
// Task Types
// ------------------------------
export type Task =
  | {
      id: string;
      type: "read" | "write" | "upload" | "speak";
      prompt: string;
    }
  | {
      id: string;
      type: "quiz";
      prompt: string;
      questions: QuizQuestion[];
    };

// ------------------------------
// Scenario and Structure Types
// ------------------------------
export type Scenario = {
  title: string;
  description: string;
};

export type Phase = {
  title: string;
  description: string;
};

// ------------------------------
// Module Type (Expanded for Rich JSON)
// ------------------------------
export type Module = {
  id: string; // ✅ always a string
  title: string;
  description?: string;
  narrator?: string;
  purpose?: string;
  readingSummary?: string[];
  tasks: Task[];
  scenarios?: { title: string; description: string }[];
  structure?: { phases: { title: string; description: string }[] };
  metrics?: {
    startingCoins: number;
    signatureConversion: string;
    eligibility: Record<string, { cc: number; approval: number }>;
  };
  narration?: Record<string, string>;
  sources?: string[];
  outcome?: { description: string };
  nextModule?: { id: string; title: string } | null; // ✅ allow null for last module
};
