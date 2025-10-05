// ./app/components/ModuleSelector.tsx
"use client";

import React, { useState, useEffect } from "react";
import { modules } from "@/config/modules";
import { CandidateState, Module } from "@/app/ai/types";
import ModuleDisplay from "@/app/components/ModuleDisplay";

interface ModuleSelectorProps {
  candidateState: CandidateState | null;
  setCandidateState: React.Dispatch<React.SetStateAction<CandidateState | null>>;
}

const ModuleSelector: React.FC<ModuleSelectorProps> = ({
  candidateState,
  setCandidateState,
}) => {
  const [selected, setSelected] = useState<Module | null>(null);

  const handleSelectModule = (id: string) => {
    const module = modules.find((m) => m.id === id);
    if (module) {
      setSelected(module);
    }
  };

  // 🧩 Automatically start at Module 0
  useEffect(() => {
    const module0 = modules.find((m) => m.id === "0");
    if (module0) setSelected(module0);
  }, []);

  return (
    <div className="p-4 bg-white/90 border rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-3">📘 Module Selector</h2>

      <div className="flex flex-wrap gap-2 mb-4">
        {modules.map((m) => (
          <button
            key={m.id}
            onClick={() => handleSelectModule(m.id)}
            className={`px-3 py-2 rounded-md border transition ${
              selected?.id === m.id
                ? "bg-blue-600 text-white border-blue-700"
                : "bg-gray-100 hover:bg-gray-200"
            }`}
          >
            {m.title}
          </button>
        ))}
      </div>

      {/* Render module only when both are ready */}
      {candidateState && selected && (
        <ModuleDisplay
          module={selected}
          candidateState={candidateState}
          setCandidateState={setCandidateState}
        />
      )}
    </div>
  );
};

export default ModuleSelector;
