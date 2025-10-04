// ./app/ai/aiLoop.ts
import { modules } from "@/config/modules";
// ./app/ai/aiLoop.ts

import { CandidateState } from "./types";

export const initCandidateState = (): CandidateState => ({
  office: "House", // default office; you can change later based on user input
  cc: 50,
  signatures: 0,
  approval: 0,
  threshold: {
    cc: 31,        // minimum CC for House
    approval: 2.5, // minimum approval %
    sigs: 7        // optional signature threshold (if applicable)
  },
});

// Run one module
export const runModule = async (module: Module, candidateState: CandidateState) => {
  const moduleState = initModuleState(module);

  console.log(`\n=== Module ${module.id}: ${module.title} ===`);
  console.log(module.description);

  for (const task of module.tasks) {
    await handleTask(task, moduleState);
    moduleState.completedTasks++;
  }

  moduleState.finished = true;

  // update candidate state
  candidateState.cc += moduleState.ccChange;
  candidateState.signatures += moduleState.signaturesChange;
  candidateState.approval += moduleState.approvalChange;

  console.log(
    `Module ${module.id} completed. CC: ${candidateState.cc}, Signatures: ${candidateState.signatures}, Approval: ${candidateState.approval.toFixed(2)}%`
  );
};

// Handle tasks
const handleTask = async (task: Task, moduleState: ModuleState) => {
  console.log(`Task: [${task.type}] ${task.prompt}`);
  await new Promise((resolve) => setTimeout(resolve, 500));

  switch (task.type) {
    case "read":
      moduleState.approvalChange += 0.1;
      break;
    case "write":
      moduleState.signaturesChange += 5;
      moduleState.ccChange += 1;
      break;
    case "speak":
      moduleState.approvalChange += 0.5;
      break;
    case "upload":
      moduleState.ccChange += 2;
      break;
    case "quiz":
      moduleState.signaturesChange += 10;
      moduleState.approvalChange += 0.3;
      break;
  }
};
