// ./app/ai/aiLoop.ts
import { Module, CandidateState, QuizQuestion } from "./types";

// Initialize candidate state
export const initCandidateState = (office: "President" | "Senate" | "House"): CandidateState => {
  let threshold = { cc: 0, approval: 0, sigs: 0 };

  switch (office) {
    case "President":
      threshold = { cc: 75, approval: 2.5, sigs: 0 };
      break;
    case "Senate":
      threshold = { cc: 50, approval: 2.5, sigs: 0 };
      break;
    case "House":
      threshold = { cc: 31, approval: 2.5, sigs: 0 };
      break;
  }

  return {
    office,
    cc: 50,
    signatures: 0,
    approval: 0,
    currentModuleId: "0",
    threshold,
  };
};

// Run a module and apply changes directly to CandidateState
export const runModule = (module: Module, candidate: CandidateState): CandidateState => {
  const updated = { ...candidate };

  module.tasks.forEach((task) => {
    switch (task.type) {
      case "quiz":
        task.questions?.forEach((q: QuizQuestion) => {
          if (q.correct !== undefined) updated.signatures += 20;
          else updated.cc -= 1;
        });
        break;
      case "read":
      case "write":
      case "speak":
        break; // Extend later
    }
  });

  updated.currentModuleId = (parseInt(module.id) + 1).toString();
  return updated;
};
