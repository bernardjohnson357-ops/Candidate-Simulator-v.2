// app/ai/moduleLogic.ts

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

export const initialState: ModuleState = {
  cc: 50,
  signatures: 0,
  approval: 0,
};
