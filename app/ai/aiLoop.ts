// ./app/ai/aiLoop.ts
import { Module, ModuleState, CandidateState, QuizQuestion } from "./types";

// Candidate base state
// ./app/ai/aiLoop.ts

export const initModuleState = (module: Module): ModuleState => ({
  moduleId: String(module.id), // ✅ force to string
  completedTasks: 0,
  totalTasks: module.tasks.length,
  ccChange: 0,
  signaturesChange: 0,
  approvalChange: 0,
  finished: false,
});

/**
 * Run a module and calculate outcomes
 */
export const runModule = (
  module: Module,
  candidate: CandidateState
): { moduleState: ModuleState; candidateState: CandidateState } => {
  let moduleState = initModuleState(module);
  let updatedCandidate = { ...candidate };

  module.tasks.forEach((task) => {
    moduleState.completedTasks++;

    if (task.type === "quiz" && task.questions) {
      task.questions.forEach((q: QuizQuestion) => {
        // ✅ Assume "correct" field marks the right answer
        if (q.correct !== undefined) {
          moduleState.signaturesChange += 20; // correct answer → +20 signatures
        } else {
          moduleState.ccChange -= 1; // wrong answer penalty
        }
      });
    }

    if (task.type === "read") {
      // No state change, just informational
    }

    if (task.type === "write") {
      // Could deduct or reward CC in future
    }

    if (task.type === "speak") {
      // Later we could add effects like approvalChange
    }
  });

  // Apply module changes to candidate
  updatedCandidate.cc += moduleState.ccChange;
  updatedCandidate.signatures += moduleState.signaturesChange;
  updatedCandidate.approval += moduleState.approvalChange;

  moduleState.finished = true;

  return { moduleState, candidateState: updatedCandidate };
};
