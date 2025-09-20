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

  if (current.logic) {
    aiResponse = current.logic(input, state);
  } else {
    aiResponse = "⚠️ This module has no logic defined.";
  }

  // Move to next module
  currentIndex++;

  if (libertarianSimulator[currentIndex]) {
    const next = libertarianSimulator[currentIndex];
    aiResponse += `\n\n--- ${next.title} ---\n${next.narrator}\n\n${next.prompt}`;
  } else {
    aiResponse += "\n\n🎉 You’ve completed the Libertarian Candidate Simulator!";
  }

  return { state, aiResponse };
};

/**
 * Reset the simulator back to Module 0.
 */
export const resetSimulator = () => {
  currentIndex = 0;
  state = { ...initialState };
  return {
    state,
    aiResponse: `${libertarianSimulator[0].narrator}\n\n${libertarianSimulator[0].prompt}`,
  };
};
  aiResponse += `Current Stats → CC: ${state.CC}, Signatures: ${state.signatures}, Voter Approval: ${state.voterApproval.toFixed(
    1
  )}%`;

  return { state, aiResponse };
}
