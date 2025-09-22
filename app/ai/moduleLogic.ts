// app/ai/moduleLogic.ts

export interface ModuleState {
  office: "President" | "Senate" | "House"; // required
  cc: number;
  signatures: number;
  approval: number;
  threshold?: { cc: number; approval: number; sigs: number };
}
