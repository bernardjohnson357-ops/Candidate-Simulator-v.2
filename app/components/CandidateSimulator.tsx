// File: app/components/CandidateSimulator.tsx
import React, { useState } from "react";
import { libertarianSimulator } from "../ai/libertarianSimulator";
import { ModuleState } from "../ai/types";

const CandidateSimulator: React.FC = () => {
  // ------------------------------
  // Initialize state
  // ------------------------------
  const initialState: ModuleState = {
    office: "House",  // placeholder; Module 0 will update
    cc: 50,
    signatures: 0,
    approval: 0,
    threshold: undefined,
  };

  const [state, setState] = useState<ModuleState>({ ...initialState });
  const [currentIndex, setCurrentIndex] = useState(0);
  const [moduleText, setModuleText] = useState<string>("");

  // ------------------------------
  // Handle user input for current module
  // ------------------------------
  const handleInput = (input: string) => {
    const currentModule = libertarianSimulator[currentIndex];

    // Create a fully compliant ModuleState object
    const newState: ModuleState = {
      office: state.office || "House",
      cc: state.cc,
      signatures: state.signatures,
      approval: state.approval,
      threshold: state.threshold,
    };

    // Run module logic
    let text: string;
    if (currentModule.logic) {
      text = currentModule.logic(input, newState);
    } else {
      text = "No logic found for this module.";
    }

    // Update state and module text
    setState(newState);
    setModuleText(text);
  };

  // ------------------------------
  // Advance to next module
  // ------------------------------
  const nextModule = () => {
    if (currentIndex < libertarianSimulator.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setModuleText(""); // clear previous module text
    }
  };

  const currentModule = libertarianSimulator[currentIndex];

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">{`Module ${currentModule.id}: ${currentModule.title}`}</h2>
      <p className="my-2">{currentModule.narrator}</p>

      <input
        type="text"
        placeholder={currentModule.prompt}
        className="border p-2 w-full"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleInput((e.target as HTMLInputElement).value);
            (e.target as HTMLInputElement).value = "";
          }
        }}
      />

      {moduleText && (
        <div className="mt-2 p-2 border bg-gray-100">
          <strong>Result:</strong> {moduleText}
        </div>
      )}

      <div className="mt-4">
        <p>CC: {state.cc}</p>
        <p>Signatures: {state.signatures}</p>
        <p>Approval: {state.approval.toFixed(1)}%</p>
      </div>

      {currentIndex < libertarianSimulator.length - 1 && (
        <button
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
          onClick={nextModule}
        >
          Next Module
        </button>
      )}
    </div>
  );
};

export default CandidateSimulator;
