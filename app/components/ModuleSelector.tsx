// ./app/components/ModuleSelector.tsx
"use client";

import React from "react";
import { Module, CandidateState } from "@/app/ai/types";

interface ModuleSelectorProps {
  candidateState: CandidateState | null;
  setCandidateState: React.Dispatch<React.SetStateAction<CandidateState | null>>;
  allModules: Module[];
}

const ModuleSelector: React.FC<ModuleSelectorProps> = ({
  candidateState,
  setCandidateState,
  allModules,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedModule = allModules.find((m) => m.id === e.target.value);
    if (selectedModule && candidateState) {
      // You can add logic here if selecting a module affects candidateState
      setCandidateState({ ...candidateState });
    }
  };

  return (
    <div className="p-4 max-w-3xl mx-auto bg-white/90 rounded-2xl shadow-md border border-gray-200 mb-4">
      <h2 className="text-xl font-bold mb-2">Select a Module</h2>
      <select
        className="w-full border rounded-md p-2"
        onChange={handleChange}
        value={candidateState?.currentModuleId || ""}
      >
        <option value="" disabled>
          -- Choose a Module --
        </option>
        {allModules.map((module) => (
          <option key={module.id} value={module.id}>
            {module.title}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ModuleSelector;
