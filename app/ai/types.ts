// ./app/ai/types.ts
export interface Task {
  id: string;
  type: "read" | "write" | "speak" | "upload" | "quiz";
  prompt: string;
}

export interface Module {
  id: string;
  title: string;
  description: string;  // narration or orientation text
  tasks: Task[];
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
  cc: number;
  signatures: number;
  approval: number;
  office?: string;
  threshold?: {
    cc: number;
    approval: number;
  };
}
