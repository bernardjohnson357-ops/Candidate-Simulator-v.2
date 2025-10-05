// ./app/components/ModuleSelector.tsx
"use client";

import React, { useState } from "react";
import { modules } from "@/config/modules";
import { runModule, initCandidateState } from "@/app/ai/aiLoop";
import { CandidateState } from "@/app/ai/types";
import ModuleDisplay from "./ModuleDisplay";

const ModuleSelector: React.FC = () => {
  const [selected, setSelected] = useState<typeof modules[0] | null>(null);
  const [candidateState, setCandidateState] = useState<CandidateState | null>(null);
  const [officeInput, setOfficeInput] = useState("");

  const handleStart = () => {
    const office = officeInput as "President" | "Senate" | "House";

    // Initialize candidate state based on user input
    const initState = initCandidateState(office);
    setCandidateState(initState);

    // Optionally auto-select Module 0 after office input
    const module0 = modules.find((m) => m.id === "0");
    if (module0) setSelected(module0);
  };

  return (
    <div className="p-4">
      {!candidateState && (
        <div>
          <label>Enter your office (President, Senate, House): </label>
          <input
            type="text"
            value={officeInput}
            onChange={(e) => setOfficeInput(e.target.value)}
            className="border px-2 py-1 rounded"
          />
          <button onClick={handleStart} className="ml-2 px-3 py-1 bg-blue-500 text-white rounded">
            Start
          </button>
        </div>
      )}

      {candidateState && selected && (
        <ModuleDisplay module={selected} candidateState={candidateState} setCandidateState={setCandidateState} />
      )}
    </div>
  );
};

export default ModuleSelector;
