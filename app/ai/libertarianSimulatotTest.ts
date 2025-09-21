import { libertarianSimulator, ModuleState } from "./libertarianSimulator";

// Initialize candidate state
let candidate: ModuleState = {
  office: "House", // placeholder; Module 0 will set correct office
  cc: 50,
  signatures: 0,
  approval: 0,
  threshold: undefined,
};

// Simulated user inputs for Modules 0–4
const userInputs = [
  "house",                       // Module 0 – choose office
  "both",                        // Module 1B – pay fee + collect signatures
  "treasurer bank 15-day",       // Module 2B – federal filing
  "advertising",                 // Module 3 – first move
  "Opportunity and Liberty!"     // Module 4 – campaign slogan/mission
];

// Run Modules 0–4 sequentially
for (let i = 0; i < 5; i++) {
  const module = libertarianSimulator[i];
  console.log(`\n--- Module ${module.id}: ${module.title} ---`);
  console.log(module.narrator);
  const input = userInputs[i];
  console.log(`\nUser Input: ${input}`);
  const result = module.logic(input, candidate);
  console.log(`\nResult: ${result}`);
  console.log(`CC: ${candidate.cc}, Signatures: ${candidate.signatures}, Approval: ${candidate.approval.toFixed(1)}%`);
}
