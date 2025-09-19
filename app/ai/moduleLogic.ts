// app/ai/moduleLogic.ts
import { libertarianSimulator } from "./libertarianSimulator";

// Define the type for module state
export interface ModuleState {
  cc: number;
  signatures: number;
  approval: number;
  threshold?: {
    cc: number;
    approval: number;
    sigs: number;
  };
}

// Starting state
export const initialState: ModuleState = {
  cc: 50,
  signatures: 0,
  approval: 0,
};

// Use libertarianSimulator as the active module set
export const modules = libertarianSimulator;
