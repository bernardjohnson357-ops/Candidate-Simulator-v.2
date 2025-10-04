// ./app/ai/aiLoop.ts
import { modules } from "../config/modules";
import { CandidateState, ModuleState, Module, Task } from "./types";

// ------------------------------
// Candidate base state
export const initCandidateState = (): CandidateState => ({
  office: "House", // default; can update based on user input
  cc: 50,
  signatures: 0,
  approval: 0,
  threshold: {
    cc: 31,
    approval: 2.5,
    sigs: 7,
  },
});

export const candidateState: CandidateState = initCandidateState();

// ------------------------------
// Initialize module state
export const initModuleState = (module: Module): ModuleState => ({
  moduleId: module.id,
  completedTasks: 0,
  totalTasks: module.tasks.length, // assumed always defined
  ccChange: 0,
  signaturesChange: 0,
  approvalChange: 0,
  finished: false,
});

// ------------------------------
// Run simulator through all modules linearly
export const runSimulator = async () => {
  for (let i = 0; i < modules.length; i++) {
    const module = modules[i];
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

    case "quiz":
      // Example: each correct answer = +20 signatures, bonus CC
      if (task.questions) {
        task.questions.forEach((q) => {
          if (q.correct) {
            moduleState.signaturesChange += 20;
            moduleState.ccChange += 1; // bonus CC
          }
        });
      }
      break;
  }
};
