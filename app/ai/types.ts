// ./app/ai/types.ts

// ------------------------------
// Candidate State
// ------------------------------
export type CandidateState = {
  office: "President" | "Senate" | "House";
  cc: number;           // Candidate Coins
  signatures: number;   // Voter signatures
  approval: number;     // Voter approval %
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
// Quiz question structure
// ------------------------------
export type QuizQuestion = {
  question: string;
  options: string[];
  correctAnswer: number; // index of correct option
};

// ------------------------------
// Task types
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
// Module
// ------------------------------
export type Module = {
  id: string;
  title: string;
  description: string;
  tasks: Task[]; // always defined now
};
