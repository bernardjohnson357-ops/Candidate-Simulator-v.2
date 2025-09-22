// ./app/ai/aiLoop.ts
import { libertarianSimulator } from "../utils/libertarianSimulator";
import { CandidateState, ModuleState, Module, Task } from "./types";

// ------------------------------
// Candidate-wide state
export const candidateState: CandidateState = {
  office: "House", // placeholder; will be set by Module 0
  cc: 50,
  signatures: 0,
  approval: 0,
  threshold: {
    cc: 31,
    approval: 2.5,
    sigs: 7,
  },
};

// ------------------------------
// Initialize module state
const initModuleState = (module: Module): ModuleState => ({
  moduleId: module.id,
  completedTasks: 0,
  totalTasks: module.tasks.length,
  ccChange: 0,
  signaturesChange: 0,
  approvalChange: 0,
  finished: false,
});

// ------------------------------
// Run simulator through all modules linearly
export const runSimulator = async () => {
  for (let i = 0; i < libertarianSimulator.length; i++) {
    const module = libertarianSimulator[i];
    const moduleState = initModuleState(module);

    console.log(`\n=== Module ${module.id}: ${module.title} ===`);
    console.log(module.description);

    // Loop through tasks automatically
    for (const task of module.tasks) {
      await handleTask(task, moduleState);
      moduleState.completedTasks++;
    }

    moduleState.finished = true;

    // Update candidate state with module changes
    candidateState.cc += moduleState.ccChange || 0;
    candidateState.signatures += moduleState.signaturesChange || 0;
    candidateState.approval += moduleState.approvalChange || 0;

    console.log(
      `Module ${module.id} completed. CC: ${candidateState.cc}, Signatures: ${candidateState.signatures}, Approval: ${candidateState.approval.toFixed(
        2
      )}%`
    );
  }

  console.log("\n=== Simulation Complete ===");
  console.log(candidateState);
};

// ------------------------------
// Handle each task
const handleTask = async (task: Task, moduleState: ModuleState) => {
  console.log(`Task: [${task.type}] ${task.prompt}`);

  // Simulate AI/user interaction delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  // Example reward logic (replace with real AI evaluation)
  switch (task.type) {
    case "read":
      moduleState.approvalChange = (moduleState.approvalChange || 0) + 0.1;
      break;
    case "write":
      moduleState.signaturesChange = (moduleState.signaturesChange || 0) + 5;
      moduleState.ccChange = (moduleState.ccChange || 0) + 1;
      break;
    case "speak":
      moduleState.approvalChange = (moduleState.approvalChange || 0) + 0.5;
      break;
    case "upload":
      moduleState.ccChange = (moduleState.ccChange || 0) + 2;
      break;
  }
};
