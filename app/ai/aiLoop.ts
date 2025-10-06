// ./app/ai/aiLoop.ts
import { Module, ModuleState, CandidateState, QuizQuestion } from "./types";

// ✅ Initialize candidate state with thresholds
export const initCandidateState = (
  office: "President" | "Senate" | "House"
): CandidateState => {
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
    threshold,
    currentModuleId: "0", // start at Module 0
  };
};

// ✅ Run a module and calculate outcomes
export const runModule = (
  module: Module,
  candidate: CandidateState
): { moduleState: ModuleState; candidateState: CandidateState } => {
  const moduleState: ModuleState = {
    moduleId: module.id,
    completedTasks: 0,
    totalTasks: module.tasks.length,
    ccChange: 0,
    signaturesChange: 0,
    approvalChange: 0,
    finished: false,
  };

  // Copy candidate state to update
  const updatedCandidate: CandidateState = { ...candidate };

  // Loop through tasks and apply simple scoring logic
  module.tasks.forEach((task) => {
    moduleState.completedTasks++;

    switch (task.type) {
      case "quiz":
        if (task.questions) {
          task.questions.forEach((q: QuizQuestion) => {
            // Example scoring: correct answers give signatures, wrong reduce CC
            if (q.correct !== undefined) {
              moduleState.signaturesChange += 20; // +20 signatures per question
            } else {
              moduleState.ccChange -= 1; // penalty for mistakes
            }
          });
        }
        break;

      case "read":
      case "write":
      case "speak":
        // Placeholder for future logic
        break;
    }
  });

  // Update candidate totals
  updatedCandidate.cc += moduleState.ccChange;
  updatedCandidate.signatures += moduleState.signaturesChange;
  updatedCandidate.approval += moduleState.approvalChange;

  // Move candidate to next module
  updatedCandidate.currentModuleId = (parseInt(module.id) + 1).toString();

  moduleState.finished = true;

  return { moduleState, candidateState: updatedCandidate };
};
