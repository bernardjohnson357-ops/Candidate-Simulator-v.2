// ./app/ai/aiLoop.ts
import { modules } from "@/config/modules";
import { CandidateState, ModuleState, Module, Task } from "./types";

// ------------------------------
// Initialize candidate state
// ------------------------------
export const initCandidateState = (): CandidateState => ({
  cc: 50,
  signatures: 0,
  approval: 0,
});

// ------------------------------
// Initialize module state
// ------------------------------
export const initModuleState = (module: Module): ModuleState => ({
  moduleId: module.id,
  completedTasks: 0,
  totalTasks: module.tasks.length,
  ccChange: 0,
  signaturesChange: 0,
  approvalChange: 0,
  finished: false, // ✅ required by ModuleState
});

// ------------------------------
// Handle a single task
// ------------------------------
export const handleTask = async (task: Task, moduleState: ModuleState) => {
  console.log(`\nTask (${task.type}): ${task.prompt}`);

  // Placeholder: later you’ll implement quizzes, speech, etc
  // For now we just simulate completion
  console.log("✅ Task completed");
};

// ------------------------------
// Run the simulator
// ------------------------------
export const runSimulator = async () => {
  const candidateState = initCandidateState();

  for (const module of modules) {
    const moduleState = initModuleState(module);

    console.log(`\n=== Module ${module.id}: ${module.title} ===`);
    console.log(module.content);

    // ✅ tasks are always required now
    for (const task of module.tasks) {
      await handleTask(task, moduleState);
      moduleState.completedTasks++;
    }

    console.log(`\nFinished ${module.title}`);
    console.log(`Progress: ${moduleState.completedTasks}/${moduleState.totalTasks}`);
  }

  console.log("\n🎉 Simulation finished!");
};
