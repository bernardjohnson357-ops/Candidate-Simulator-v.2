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

// ./app/ai/types.ts
export interface CandidateState {
  cc: number;
  signatures: number;
  approval: number;
  office?: string; // optional until the user declares
  threshold?: { 
    cc: number; 
    approval: number; 
  }; // optional until office is chosen
}
