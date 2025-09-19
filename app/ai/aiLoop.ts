// app/ai/aiLoop.ts
import { libertarianSimulator } from "./libertarianSimulator";

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

export async function runAIModule(state: GameState, userInput: string) {
  const currentModule: Module = modules[state.currentModuleIndex];
  const task: Task = currentModule.tasks[state.currentTaskIndex];

  let aiResponse = `Module: ${currentModule.title}\nTask: ${task.prompt}\n`;

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

  if (task.type === "write" || task.type === "read" || task.type === "scenario") {
    aiResponse += "Task completed.\n";
  }

  state.currentTaskIndex += 1;

  if (state.currentTaskIndex >= currentModule.tasks.length) {
    state.currentModuleIndex =
      state.currentModuleIndex + 1 < modules.length
        ? state.currentModuleIndex + 1
        : state.currentModuleIndex;
    state.currentTaskIndex = 0;
    aiResponse += `\n➡ Moving to next module: ${modules[state.currentModuleIndex].title}\n`;
  }

  aiResponse += `Current Stats → CC: ${state.CC}, Signatures: ${state.signatures}, Voter Approval: ${state.voterApproval.toFixed(
    1
  )}%`;

  return { state, aiResponse };
}
