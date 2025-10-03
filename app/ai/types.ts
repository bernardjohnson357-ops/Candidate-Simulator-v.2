// app/ai/types.ts

export interface Task {
  id: string;
  type: "read" | "write" | "speak" | "upload";
  prompt: string;
}

export interface Module {
  id: string;
  title: string;
  description?: string;
  content?: string;   // ✅ add this
  tasks?: Task[];
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
