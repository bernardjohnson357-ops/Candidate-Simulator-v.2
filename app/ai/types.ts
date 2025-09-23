// ./app/ai/types.ts

// ------------------------------
// Task types (how the candidate interacts)
// ------------------------------
export type TaskType = "read" | "write" | "speak" | "upload";

// ------------------------------
// Individual Task definition
// ------------------------------
export interface Task {
  id: string;                // unique task ID
  type: TaskType;            // kind of task
  prompt: string;            // what the candidate sees
  expectedAnswer?: string;   // for evaluation (optional)
  ccReward?: number;         // CC gained if correct
  ccPenalty?: number;        // CC lost if incorrect
  signaturesReward?: number; // signatures gained if correct
  signaturesPenalty?: number;// signatures lost if incorrect
}

// ------------------------------
// Module definition
// ------------------------------
export interface Module {
  id: string;            // e.g., "0", "1A"
  title: string;         // module title
  briefSummary?: string; // optional short summary
  detailedSummary?: string; // AI narration / detailed guidance
  description?: string;  // fallback description
  tasks: Task[];         // all tasks in this module
}

// ------------------------------
// Candidate-wide state
// ------------------------------
export interface CandidateState {
  office: "President" | "Senate" | "House";
  cc: number;            // Candidate Coins
  signatures: number;    // petition support
  approval: number;      // percentage approval
  threshold?: {
    cc: number;
    approval: number;
    sigs: number;
  };
}

// ------------------------------
// Per-module state
// ------------------------------
export interface ModuleState {
  moduleId: string;
  completedTasks: number;
  totalTasks: number;
  ccChange?: number;
  signaturesChange?: number;
  approvalChange?: number;
  finished?: boolean;
}
