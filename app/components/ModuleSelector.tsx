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
  // Logic for selecting and activating modules goes here
  // Example: auto-activate the next module based on current state
  if (!candidateState.currentModule) {
    const nextModule = { id: "module_1", title: "Orientation" }; // example
    setCurrentModule(nextModule);
  }

  // Optional: update candidate state if needed
  setCandidateState((prev) => ({
    ...prev,
    lastAction: "Module auto-selected",
  }));
};

export default ModuleSelector;
      </select>
    </div>
  );
};

export default ModuleSelector;
