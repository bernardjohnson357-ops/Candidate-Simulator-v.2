// ./app/ai/aiLoop.ts
import { Module, ModuleState, CandidateState, QuizQuestion } from "./types";

// ✅ Initialize candidate state
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

  const updatedCandidate: CandidateState = { ...candidate };

  module.tasks.forEach((task) => {
    moduleState.completedTasks++;

    if (task.type === "quiz" && task.questions) {
      task.questions.forEach((q: QuizQuestion) => {
        if (q.correct !== undefined) {
          moduleState.signaturesChange += 20;
        } else {
          moduleState.ccChange -= 1;
        }
      });
    }
  });

  updatedCandidate.cc += moduleState.ccChange;
  updatedCandidate.signatures += moduleState.signaturesChange;
  updatedCandidate.approval += moduleState.approvalChange;
  updatedCandidate.currentModuleId = (parseInt(module.id) + 1).toString();

  moduleState.finished = true;

  return { moduleState, candidateState: updatedCandidate };
};
