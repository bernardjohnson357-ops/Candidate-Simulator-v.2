// ./app/ai/aiLoop.ts
import { Module, ModuleState, CandidateState, QuizQuestion } from "./types";

// ✅ Candidate base state
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
    threshold,
  };
};

// ✅ Run a module and calculate outcomes
export const runModule = (
  module: Module,
  candidate: CandidateState
): { moduleState: ModuleState; candidateState: CandidateState } => {
  let moduleState: ModuleState = {
    moduleId: String(module.id),
    completedTasks: 0,
    totalTasks: module.tasks.length,
    ccChange: 0,
    signaturesChange: 0,
    approvalChange: 0,
    finished: false,
  };

  let updatedCandidate = { ...candidate };

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

    if (task.type === "read") {}
    if (task.type === "write") {}
    if (task.type === "speak") {}
  });

  updatedCandidate.cc += moduleState.ccChange;
  updatedCandidate.signatures += moduleState.signaturesChange;
  updatedCandidate.approval += moduleState.approvalChange;

  moduleState.finished = true;

  return { moduleState, candidateState: updatedCandidate };
};
