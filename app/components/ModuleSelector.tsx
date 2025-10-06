// ./app/components/ModuleSelector.tsx
"use client";

import React from "react";
import { CandidateState, Module } from "../ai/types";

interface ModuleSelectorProps {
  candidateState: CandidateState;
  setCandidateState: React.Dispatch<React.SetStateAction<CandidateState>>;
  setCurrentModule: React.Dispatch<React.SetStateAction<Module | null>>;
}

const ModuleSelector = ({
  candidateState,
  setCandidateState,
  setCurrentModule,
}: ModuleSelectorProps): void => {
  // If no current module is set, activate the first one
  if (!candidateState.currentModuleId) {
    const nextModule: Module = {
      id: "module_1",
      title: "Orientation & Introduction",
      description: "Welcome to the Federal Candidate Simulator.",
    };
    setCurrentModule(nextModule);

    // Update candidate state to reflect the change
    setCandidateState((prev) => ({
      ...prev,
      currentModuleId: nextModule.id,
      lastAction: "Module auto-selected",
    }));
  }
};

export default ModuleSelector;
