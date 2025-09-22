// ./app/ai/types.ts

// ------------------------------
// Task types (how the candidate interacts)
// ------------------------------
export type TaskType = "read" | "write" | "speak" | "upload";

export interface Task {
  type: TaskType;
  prompt: string;
}

// ------------------------------
// Module definition
// ------------------------------
export interface Module {
  id: string;            // e.g., "0", "1A"
  title: string;
  description: string;
  tasks: Task[];
  // NOTE: no "logic" field — everything is task-driven
}

// ------------------------------
// Candidate-wide state
// ------------------------------
export interface CandidateState {
  office: "President" | "Senate" | "House";
  cc: number;            // Candidate Coins
  signatures: number;
  approval: number;
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
