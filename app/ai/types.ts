export type TaskType = "read" | "write" | "speak" | "upload";

export interface Task {
  id: string;
  type: TaskType;
  prompt: string;
}

export interface Module {
  id: string;
  title: string;
  description: string;
  tasks: Task[];
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

export interface ModuleState {
  moduleId: string;
  completedTasks: number;
  totalTasks: number;
  ccChange: number;
  signaturesChange: number;
  approvalChange: number;
  finished: boolean;
}
