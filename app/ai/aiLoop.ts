// ./app/ai/aiLoop.ts
import { CandidateState, Module, Task, QuizQuestion } from "./types";

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
  case "speak":
    // Read aloud in both cases
    speak(task.prompt); // your TTS function
    break;

  case "quiz":
    // normal quiz logic
    break;

  case "write":
    updatedState.cc += 2;
    break;

  case "decision":
    // handle decisions
    break;

  case "upload":
    // handle uploads
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
