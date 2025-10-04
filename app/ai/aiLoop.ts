// ./app/ai/aiLoop.ts
import { modules } from "@/config/modules";
import { CandidateState, ModuleState, Module, Task } from "./types";

// Candidate base state
export const initCandidateState = (): CandidateState => ({
  cc: 50,
  signatures: 0,
  approval: 0,
});

// Module state initializer
export const initModuleState = (module: Module): ModuleState => ({
  moduleId: module.id,
  completedTasks: 0,
  totalTasks: module.tasks.length,
  ccChange: 0,
  signaturesChange: 0,
  approvalChange: 0,
  finished: false,
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
