import { modules } from "../../config/modules";
import { CandidateState, ModuleState, Module, Task } from "./types";

export const candidateState: CandidateState = {
  office: "House", // placeholder
  cc: 50,
  signatures: 0,
  approval: 0,
  threshold: { cc: 31, approval: 2.5, sigs: 7 },
};

// ------------------------------
// Initialize module state
const initModuleState = (module: Module): ModuleState => ({
  moduleId: module.id,
  completedTasks: 0,
  totalTasks: module.tasks ? module.tasks.length : 0, // ✅ safe check
  ccChange: 0,
  signaturesChange: 0,
  approvalChange: 0,
  finished: false,
});

export const runSimulator = async () => {
  for (let i = 0; i < modules.length; i++) {
    const module = modules[i];
    const moduleState = initModuleState(module);

    console.log(`\n=== Module ${module.id}: ${module.title} ===`);
    console.log(module.description);

    for (const task of module.tasks) {
      await handleTask(task, moduleState);
      moduleState.completedTasks++;
    }

    moduleState.finished = true;

    candidateState.cc += moduleState.ccChange;
    candidateState.signatures += moduleState.signaturesChange;
    candidateState.approval += moduleState.approvalChange;

    console.log(
      `Module ${module.id} complete. CC: ${candidateState.cc}, Signatures: ${candidateState.signatures}, Approval: ${candidateState.approval.toFixed(2)}%`
    );
  }

  console.log("\n=== Simulation Complete ===");
  console.log(candidateState);
};

const handleTask = async (task: Task, moduleState: ModuleState) => {
  console.log(`Task: [${task.type}] ${task.prompt}`);

  await new Promise((resolve) => setTimeout(resolve, 300));

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
  }
};
