// ./app/ai/aiLoop.ts

import { Module, ModuleState, CandidateState, QuizQuestion } from "./types";

// ------------------------------
// Office eligibility rules
// ------------------------------
const officeRules = {
  President: { cc: 75, approval: 2.5 },
  Senate: { cc: 50, approval: 2.5 },
  House: { cc: 31, approval: 2.5 },
} as const;

// ------------------------------
// Initialize Candidate State
// ------------------------------
export const initCandidateState = (
  office: "President" | "Senate" | "House"
): CandidateState => {
  const rule = officeRules[office];
  return {
    office,
    cc: 50, // Starting Candidate Coins
    signatures: 0,
    approval: 0,
    threshold: {
      cc: rule.cc,
      approval: rule.approval,
    },
  };
};

// ------------------------------
// Initialize Module State
// ------------------------------
export const initModuleState = (module: Module): ModuleState => ({
  moduleId: String(module.id),
  completedTasks: 0,
  totalTasks: module.tasks.length,
  ccChange: 0,
  signaturesChange: 0,
  approvalChange: 0,
  finished: false,
});

// ------------------------------
// Update candidate stats dynamically
// ------------------------------
export const updateCandidateProgress = (
  candidate: CandidateState,
  moduleState: ModuleState
): CandidateState => {
  const updated = { ...candidate };

  // Apply deltas from the module
  updated.cc += moduleState.ccChange;
  updated.signatures += moduleState.signaturesChange;

  // Auto-update approval: 100 signatures = 1%
  const approvalGain = Math.floor(moduleState.signaturesChange / 100);
  updated.approval += approvalGain;

  // Keep numbers positive and realistic
  if (updated.cc < 0) updated.cc = 0;
  if (updated.signatures < 0) updated.signatures = 0;
  if (updated.approval < 0) updated.approval = 0;

  // Recalculate thresholds if needed
  updated.threshold = officeRules[updated.office];

  return updated;
};

// ------------------------------
// Run a module and calculate outcomes
// ------------------------------
export const runModule = (
  module: Module,
  candidate: CandidateState
): { moduleState: ModuleState; candidateState: CandidateState } => {
  let moduleState = initModuleState(module);

  module.tasks.forEach((task) => {
    moduleState.completedTasks++;

    if (task.type === "quiz" && "questions" in task) {
      task.questions.forEach((q: QuizQuestion) => {
        if (q.correct !== undefined) {
          moduleState.signaturesChange += 20; // correct → +20 sigs
        } else {
          moduleState.ccChange -= 1; // wrong → -1 CC
        }
      });
    }

    if (task.type === "read") {
      // Informational only
    }

    if (task.type === "write") {
      // Optional: reward effort or clarity in future
    }

    if (task.type === "speak") {
      // Optional: affect approval later (communication skill bonus)
    }
  });

  // Apply updates to candidate
  const updatedCandidate = updateCandidateProgress(candidate, moduleState);

  moduleState.finished = true;

  return { moduleState, candidateState: updatedCandidate };
};
