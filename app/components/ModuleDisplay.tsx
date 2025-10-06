// ./app/components/ModuleDisplay.tsx
"use client";

import React from "react";
import { CandidateState, Module } from "@/app/ai/types";

interface ModuleDisplayProps {
  module: Module;
  candidateState: CandidateState;
  setCandidateState: React.Dispatch<React.SetStateAction<CandidateState | null>>;
}

const ModuleDisplay: React.FC<ModuleDisplayProps> = ({ module, candidateState, setCandidateState }) => {
  return (
    <div className="border p-4 rounded-md bg-gray-100">
      <h3 className="text-xl font-semibold">{module.title}</h3>
      {module.description && <p className="mt-2">{module.description}</p>}

      {module.readingSummary && module.readingSummary.length > 0 && (
        <div className="mt-2">
          <strong>Reading Summary:</strong>
          <ul className="list-disc ml-5">
            {module.readingSummary.map((line, idx) => (
              <li key={idx}>{line}</li>
            ))}
          </ul>
        </div>
      )}

      {module.purpose && (
        <p className="mt-2">
          <strong>Purpose:</strong> {module.purpose}
        </p>
      )}

      {module.scenarios && module.scenarios.length > 0 && (
        <div className="mt-2">
          <strong>Scenarios:</strong>
          <ul className="list-disc ml-5">
            {module.scenarios.map((scenario, idx) => (
              <li key={idx}>{scenario}</li>
            ))}
          </ul>
        </div>
      )}

      {module.outcome && (
        <p className="mt-2">
          <strong>Outcome:</strong>{" "}
          {typeof module.outcome === "string" ? module.outcome : JSON.stringify(module.outcome)}
        </p>
      )}

      {module.nextModule && (
        <p className="mt-2">
          <strong>Next Module:</strong> {module.nextModule.title}
        </p>
      )}
    </div>
  );
};

export default ModuleDisplay;
