// File: app/page.tsx
"use client";
import React, { useState } from "react";
import { libertarianSimulator } from "./ai/libertarianSimulator";
import { ModuleState } from "./ai/moduleLogic"; // original ModuleState from Module 0–2 stable setup

export default function SimulatorPage() {
  // ------------------------------
  // Initialize candidate state
  // ------------------------------
  const initialState: ModuleState = {
    office: "House",       // placeholder; Module 0 will set it
    cc: 50,
    signatures: 0,
    approval: 0,
    threshold: undefined,
  };

  const [state, setState] = useState<ModuleState>({ ...initialState });
  const [currentIndex, setCurrentIndex] = useState(0);
  const [moduleText, setModuleText] = useState<string>("");

  // ------------------------------
  // Handle user input
  // ------------------------------
  const handleInput = (input: string) => {
    const currentModule = libertarianSimulator[currentIndex];

    const newState: ModuleState = {
      office: state.office || "House",
      cc: state.cc,
      signatures: state.signatures,
      approval: state.approval,
      threshold: state.threshold,
    };

    let text: string;
    if (currentModule.logic) {
      text = currentModule.logic(input, newState);
    } else {
      text = "No logic found for this module.";
    }

    setState(newState);
    setModuleText(text);
  };

  // ------------------------------
  // Advance module
  // ------------------------------
  const nextModule = () => {
    if (currentIndex < 2) { // only Modules 0–2 for now
      setCurrentIndex(currentIndex + 1);
      setModuleText("");
    }
  };

  const currentModule = libertarianSimulator[currentIndex];

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Libertarian Candidate Simulator</h1>

      <h2 className="text-xl mt-4">{`Module ${currentModule.id}: ${currentModule.title}`}</h2>
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

      {currentIndex < 2 && (
        <button
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
          onClick={nextModule}
        >
          Next Module
        </button>
      )}
    </div>
  );
}
