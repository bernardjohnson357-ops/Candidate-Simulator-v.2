// app/ai/types.ts

export interface Task {
  id: string;
  type: "read" | "write" | "upload" | "speak";
  prompt: string;
}

export interface Module {
  id: string;
  title: string;
  content: string;
  tasks: Task[];  // 👈 make tasks always required
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

export interface CandidateState {
  office: string;
  cc: number;
  signatures: number;
  approval: number;
  threshold: {
    cc: number;
    approval: number;
    sigs: number;
  };
}
