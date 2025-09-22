// app/ai/types/index.ts

export interface ModuleState {
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
