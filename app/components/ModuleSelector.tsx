// ./app/components/ModuleSelector.tsx
"use client";

import React, { useState, useEffect } from "react";
import { CandidateState, Module } from "@/app/ai/types";

interface ModuleSelectorProps {
  candidateState: CandidateState | null;
  setCandidateState: React.Dispatch<React.SetStateAction<CandidateState | null>>;
  setCurrentModule: React.Dispatch<React.SetStateAction<Module | null>>;
}

// 🔹 Dynamic module loader
const loadModule = async (id: string): Promise<Module | null> => {
  try {
    const module = await import(`../data/modules/module${id}.json`);
    return module.default as Module;
  } catch (err) {
    console.error("Failed to load module", id, err);
    return null;
  }
};

const ModuleSelector: React.FC<ModuleSelectorProps> = ({
  candidateState,
  setCandidateState,
  setCurrentModule,
}) => {
  const [availableModules, setAvailableModules] = useState<Module[]>([]);

  useEffect(() => {
    // Dynamically import all modules 0–15
    const loadAllModules = async () => {
      const modules: Module[] = [];
      for (let i = 0; i <= 15; i++) {
        const mod = await loadModule(i.toString());
        if (mod) modules.push(mod);
      }
      setAvailableModules(modules);
    };
    loadAllModules();
  }, []);

  const handleChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const moduleId = e.target.value;
    if (!candidateState) return;

    const mod = await loadModule(moduleId);
    if (mod) {
      setCurrentModule(mod);
      setCandidateState({ ...candidateState, currentModuleId: moduleId });
    }
  };

  return (
    <div className="mb-4">
      <label className="block mb-2 font-medium">Select Module:</label>
      <select
        className="w-full border rounded-md p-2"
        onChange={handleChange}
        value={candidateState?.currentModuleId || ""}
      >
        <option value="" disabled>
          -- Choose a Module --
        </option>
        {availableModules.map((mod) => (
          <option key={mod.id} value={mod.id}>
            {mod.title}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ModuleSelector;
