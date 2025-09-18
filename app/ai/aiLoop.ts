// app/ai/aiLoop.ts
import { modules, Module, Task } from "./moduleLogic";

// Minimal AI Control Loop state
export interface GameState {
  currentModuleIndex: number;
  CC: number;
  signatures: number;
  voterApproval: number;
}

export const initialState: GameState = {
  currentModuleIndex: 0,
  CC: 50,
  signatures: 0,
  voterApproval: 0,
};

// Run the AI loop for a given user input
export async function runAIModule(state: GameState, userInput: string) {
  const currentModule: Module = modules[state.currentModuleIndex];
  const task: Task = currentModule.tasks[0]; // simple: pick first task for demo

  let aiResponse = `Module: ${currentModule.title}\n${task.prompt}\n`;

  // Simple scoring logic for quizzes
  if (task.type === "quiz" && task.correctAnswer) {
    if (userInput.trim().toLowerCase() === task.correctAnswer.toLowerCase()) {
      state.signatures += 50;
      state.CC += 1;
      aiResponse += "✅ Correct! +50 signatures, +1 CC.\n";
    } else {
      state.signatures -= 20;
      aiResponse += "❌ Incorrect. -20 signatures.\n";
    }
  }

  // Advance module for next task
  state.currentModuleIndex =
    state.currentModuleIndex + 1 < modules.length
      ? state.currentModuleIndex + 1
      : state.currentModuleIndex;

  aiResponse += `Current Stats → CC: ${state.CC}, Signatures: ${state.signatures}, Voter Approval: ${state.voterApproval}%`;

  return { state, aiResponse };
}
