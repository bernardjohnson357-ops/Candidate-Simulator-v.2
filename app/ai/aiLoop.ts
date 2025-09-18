// app/ai/aiLoop.ts
import { modules, Module, Task } from "./moduleLogic";

// Game state
export interface GameState {
  currentModuleIndex: number;
  currentTaskIndex: number;
  CC: number;
  signatures: number;
  voterApproval: number;
}

export const initialState: GameState = {
  currentModuleIndex: 0,
  currentTaskIndex: 0,
  CC: 50,
  signatures: 0,
  voterApproval: 0,
};

// Run AI loop for a given user input
export async function runAIModule(state: GameState, userInput: string) {
  const currentModule: Module = modules[state.currentModuleIndex];
  const task: Task = currentModule.tasks[state.currentTaskIndex];

  let aiResponse = `Module: ${currentModule.title}\nTask: ${task.prompt}\n`;

  // Quiz scoring
  if (task.type === "quiz" && task.correctAnswer) {
    if (userInput.trim().toLowerCase() === task.correctAnswer.toLowerCase()) {
      state.signatures += 50;
      state.CC += 1;
      state.voterApproval += 0.5;
      aiResponse += "✅ Correct! +50 signatures, +1 CC, +0.5% approval.\n";
    } else {
      state.signatures -= 20;
      aiResponse += "❌ Incorrect. -20 signatures.\n";
    }
  }

  // Simple narrative for write/read/scenario tasks
  if (task.type === "write" || task.type === "read" || task.type === "scenario") {
    // Optionally, modify stats based on task type
    state.CC -= 0; // No default CC change
    aiResponse += `Task completed.\n`;
  }

  // Update task index
  state.currentTaskIndex += 1;

  // If module tasks are finished, move to next module
  if (state.currentTaskIndex >= currentModule.tasks.length) {
    state.currentModuleIndex =
      state.currentModuleIndex + 1 < modules.length
        ? state.currentModuleIndex + 1
        : state.currentModuleIndex;
    state.currentTaskIndex = 0;
    aiResponse += `\n➡ Moving to next module: ${modules[state.currentModuleIndex].title}\n`;
  }

  // Add current stats
  aiResponse += `Current Stats → CC: ${state.CC}, Signatures: ${state.signatures}, Voter Approval: ${state.voterApproval.toFixed(
    1
  )}%`;

  return { state, aiResponse };
}
