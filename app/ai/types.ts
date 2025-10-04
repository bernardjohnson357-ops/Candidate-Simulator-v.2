// ./app/ai/types.ts

// ------------------------------
// Candidate State
// ------------------------------
export type CandidateState = {
  office: "President" | "Senate" | "House";
  cc: number; // Candidate Coins
  signatures: number; // Voter signatures
  approval: number; // Voter approval %
  threshold: {
    cc: number;
    approval: number;
    sigs?: number;
  };
};

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
  id: string | number;
  title: string;
  narrator?: string;
  description?: string;
  purpose?: string;
  readingSummary?: string[];
  tasks: Task[];
  scenarios?: Scenario[];
  structure?: {
    phases: Phase[];
  };
  metrics?: {
    cc?: number;
    signatures?: number;
    approval?: number;
  };
  narration?: Record<string, string>;
  sources?: string[];
  outcome?: string;
  nextModule?: string;
};
