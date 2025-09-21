// File: CandidateSimulator.tsx
import { ModuleState } from "../types"; // ensure correct shared type

// Example inside your component where you run the module logic
const runModuleLogic = (input: string) => {
  const current = libertarianSimulator[currentIndex];

  // Make sure office is set; fallback to "House" if undefined
  const newState: ModuleState = {
    office: state.office || "House",
    cc: state.cc,
    signatures: state.signatures,
    approval: state.approval,
    threshold: state.threshold,
  };

  let text: string;

  if (current.logic) {
    // Run the module logic with a fully compliant ModuleState
    text = current.logic(input, newState);
  } else {
    text = "No logic found for this module.";
  }

  // Update your component state with the results
  setState(newState);
  setModuleText(text);
};
