// ./app/ai/aiLoop.ts
import { CandidateState, Module, Task, QuizQuestion } from "./types";

/** 
 * TTS helper 
 */
export const speak = (text: string) => {
  if (typeof window !== "undefined" && "speechSynthesis" in window) {
    const utterance = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(utterance);
  }
};

/** Initialize candidate state */
export const initCandidateState = (
  office: "President" | "Senate" | "House"
): CandidateState => {
  return {
    office,
    cc: 0,
    signatures: 0,
    voterApproval: 0,
    currentModuleId: "",
  };
};

/** Safely run a module and update candidate state */
export const safeRunModule = (candidateState: CandidateState, module: Module): CandidateState => {
  let updatedState = { ...candidateState };

  module.tasks.forEach((task) => {
    switch (task.type) {
      case "read":
      case "speak":
        // Read or speak the prompt
        speak(task.prompt);
        break;

      case "quiz":
        // Quiz logic can update CC or voterApproval
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

      default:
        break;
    }
  });

  return updatedState;
};

/** Legacy runModule for backward compatibility */
export const runModule = (module: Module, candidateState: CandidateState): CandidateState => {
  return safeRunModule(candidateState, module);
};
