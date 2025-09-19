// app/ai/aiLoop.ts
import { modules, initialState, ModuleState } from "./moduleLogic";

let currentIndex = 0;
let state: ModuleState = { ...initialState };

export const getNextModule = () => {
  if (currentIndex >= modules.length) {
    return null; // Simulation finished
  }
  return modules[currentIndex];
};

export const processModuleInput = (input: string) => {
  const current = modules[currentIndex];
  if (!current) return { output: "Simulation complete.", state };

  let output = "";
  if (current.logic) {
    output = current.logic(input, state);
  }

  currentIndex++;
  return { output, state };
};
  aiResponse += `Current Stats → CC: ${state.CC}, Signatures: ${state.signatures}, Voter Approval: ${state.voterApproval.toFixed(
    1
  )}%`;

  return { state, aiResponse };
}
