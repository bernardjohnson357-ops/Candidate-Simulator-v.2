// ./app/ai/aiLoop.ts
import { modules } from "../config/modules";
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
// Generate dynamic quizzes from module content
const generateQuizzesFromContent = (module: Module): Task[] => {
  if (!module.content) return [];

  // Example: split content into sections and generate one "quiz" per section
  const sections = module.content.split(/\n{2,}/); // double line break = new section

  return sections.map((section, idx) => ({
    id: `${module.id}-quiz-${idx}`,
    type: "quiz",
    prompt: `Based on the following reading, answer: ${section.slice(
      0,
      100
    )}...`, // preview first 100 chars
    options: ["Option A", "Option B", "Option C", "Option D"], // placeholder
    correctAnswer: "Option A", // placeholder
  }));
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
    case "quiz":
      moduleState.signaturesChange =
        (moduleState.signaturesChange || 0) + 20; // simulate quiz scoring
      moduleState.ccChange = (moduleState.ccChange || 0) + 1;
      break;
  }
};

// ------------------------------
// Run simulator through all modules linearly
export const runSimulator = async () => {
  for (let i = 0; i < modules.length; i++) {
    const module = modules[i];

    // Dynamically generate quiz tasks if content exists
    if (module.content) {
      module.tasks = module.tasks || [];
      const dynamicQuizzes = generateQuizzesFromContent(module);
      module.tasks.push(...dynamicQuizzes);
    }

    const moduleState = initModuleState(module);

    console.log(`\n=== Module ${module.id}: ${module.title} ===`);
    console.log(module.content || module.description);

    // Loop through tasks automatically
    if (module.tasks) {
      for (const task of module.tasks) {
        await handleTask(task, moduleState);
        moduleState.completedTasks++;
      }
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
