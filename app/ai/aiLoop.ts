// app/ai/aiLoop.ts
import { ModuleState, CandidateState, Module } from "./types";
// ------------------------------
// Initialize candidate state
// ------------------------------
const initialState: ModuleState = {
  office: "House",       // placeholder; will be set by Module 0
  cc: 50,
  signatures: 0,
  approval: 0,
  threshold: undefined,
};

let state: ModuleState = { ...initialState };
let currentIndex = 0;

// ------------------------------
// Simulated user inputs for Modules 0–4
// ------------------------------
const userInputs: string[] = [
  "house",                       // Module 0 – choose office
  "both",                        // Module 1B – pay fee + collect signatures
  "treasurer bank 15-day",       // Module 2B – federal filing
  "advertising",                 // Module 3 – first move
  "Opportunity and Liberty!"     // Module 4 – campaign slogan/mission
];

// ------------------------------
// Run Modules sequentially
// ------------------------------
while (currentIndex < 5) {
  const currentModule = libertarianSimulator[currentIndex];
  console.log(`\n--- Module ${currentModule.id}: ${currentModule.title} ---`);
  console.log(currentModule.narrator);

  const input = userInputs[currentIndex];
  console.log(`\nUser Input: ${input}`);

  // Run module logic
  if (currentModule.logic) {
    const result = currentModule.logic(input, state);
    console.log(`\nResult: ${result}`);
    console.log(`CC: ${state.cc}, Signatures: ${state.signatures}, Approval: ${state.approval.toFixed(1)}%`);
  }

  currentIndex++;
}

console.log("\nSimulation complete for Modules 0–4!");
