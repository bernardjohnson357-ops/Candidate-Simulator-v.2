// ./app/components/ModuleSelector.tsx
"use client";

import React, { useState } from "react";
import { modules } from "../../config/modules";
import { runModule, initCandidateState } from "@/app/ai/aiLoop";

const ModuleSelector: React.FC = () => {
  const [selected, setSelected] = useState<typeof modules[0] | null>(null);
  const [candidateState, setCandidateState] = useState(initCandidateState);

  const handleRun = async (mod: typeof modules[0]) => {
    setSelected(mod);
    const newState = { ...candidateState };
    await runModule(mod, newState);
    setCandidateState(newState);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Federal Candidate Simulator</h1>

      <div className="flex gap-4 mb-6">
        {modules.map((mod) => (
          <button
            key={mod.id}
            className="px-4 py-2 bg-blue-500 text-white rounded"
            onClick={() => handleRun(mod)}
          >
            {mod.title}
          </button>
        ))}
      </div>

      {selected && (
        <div>
          <h2 className="text-2xl font-bold mb-4">{selected.title}</h2>
          <div className="prose whitespace-pre-wrap">{selected.description}</div>

          <div className="mt-4 p-4 border rounded">
            <h3 className="font-semibold">Candidate State:</h3>
            <p>CC: {candidateState.cc}</p>
            <p>Signatures: {candidateState.signatures}</p>
            <p>Approval: {candidateState.approval.toFixed(2)}%</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ModuleSelector;
