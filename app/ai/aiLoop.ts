// ./app/ai/aiLoop.ts

import { CandidateState } from "./types";

export const initCandidateState = (
  office: "President" | "Senate" | "House"
): CandidateState => {
  return {
    office,
    cc: 0,
    signatures: 0,
    voterApproval: 0,       // <-- rename from approval
    currentModuleId: "",    // optional
  };
};

/**
 * Safely run a module, updating CandidateState based on tasks or other logic.
 */
export const safeRunModule = (candidateState: CandidateState, module: Module): CandidateState => {
  let updatedState = { ...candidateState };

  module.tasks.forEach((task) => {
    switch (task.type) {
      case "read":
        // Reading tasks may not change state
        break;
      case "write":
        // Example: small CC gain for writing exercises
        updatedState.cc += 2;
        break;
      case "speak":
        // Example: small approval gain
        updatedState.approval += 1;
        break;
      case "quiz":
        // Simple placeholder: reward CC for quiz existence (actual answers handled in UI)
        updatedState.cc += 5;
        break;
      default:
        break;
    }
  });

  return updatedState;
};

/**
 * Legacy runModule function kept for backward compatibility
 */
export const runModule = (module: Module, candidateState: CandidateState): CandidateState => {
  return safeRunModule(candidateState, module);
};
