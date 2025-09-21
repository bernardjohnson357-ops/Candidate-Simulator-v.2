// app/ai/aiLoop.ts
import { libertarianSimulator } from "./libertarianSimulator";
import { ModuleState, initialState } from "./moduleLogic";

let currentIndex = 0;
let state: ModuleState = { ...initialState };

/**
 * Get the current module (for narration + prompt).
 */
export const getCurrentModule = () => {
  if (!libertarianSimulator[currentIndex]) return null;
  return libertarianSimulator[currentIndex];
};

/**
 * Advance the simulator with user input.
 */
export const processInputLoop = (input: string) => {
  const current = getCurrentModule();
  if (!current) {
    return {
      state,
      aiResponse: "🎉 Simulation complete!",
    };
  }

  let aiResponse = "";

  // Run logic only for the current module
  if (current.logic) {
    aiResponse = current.logic(input, state) || "";
  }

  // ✅ Move to next module AFTER logic
  currentIndex++;

  // ✅ Show next module if available
  if (libertarianSimulator[currentIndex]) {
    const next = libertarianSimulator[currentIndex];
    aiResponse += `\n\n--- ${next.title} ---\n${next.narrator}\n\n${next.prompt}`;
  } else {
    aiResponse += "\n\n🎉 You’ve completed the Libertarian Candidate Simulator!";
  }

  return { state, aiResponse };
};
