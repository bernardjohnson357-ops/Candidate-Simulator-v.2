// ./app/ai/types.ts

// ------------------------------
// Task & Module definitions
export type TaskType = "read" | "write" | "speak" | "upload";

export interface Task {
  type: TaskType;
  prompt: string;
}

export interface Module {
  id: string; // e.g., "0", "1A", "1B", etc.
  title: string;
  description: string;
  tasks: Task[];
}

// ------------------------------
// Candidate-wide state
export interface CandidateState {
  office: "President" | "Senate" | "House";
  cc: number;
  signatures: number;
  approval: number;
  threshold?: {
    cc: number;
    approval: number;
    sigs: number;
  };
}

// ------------------------------
// Module runtime state
export interface ModuleState {
  moduleId: string;
  completedTasks: number;
  totalTasks: number;
  ccChange?: number;
  signaturesChange?: number;
  approvalChange?: number;
  finished?: boolean;
}
