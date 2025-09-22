// ./app/ai/types/index.ts
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
export interface ModuleState {
  moduleId: string;
  completedTasks: number;
  totalTasks: number;
  ccChange?: number;
  signaturesChange?: number;
  approvalChange?: number;
  finished?: boolean;
}
