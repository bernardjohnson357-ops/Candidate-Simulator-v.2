"use client";

import React from "react";
import { Module, CandidateState } from "@/app/ai/types";

interface ModuleDisplayProps {
  module: Module;
  candidateState: CandidateState; // Non-nullable
  setCandidateState: React.Dispatch<React.SetStateAction<CandidateState>>;
}

const ModuleDisplay: React.FC<ModuleDisplayProps> = ({
  module,
  candidateState,
  setCandidateState,
}) => {
  return (
    <div className="module-container">
      <h1>{module.title}</h1>
      {module.narrator && <p><strong>Narrator:</strong> {module.narrator}</p>}
      {module.purpose && <p><strong>Purpose:</strong> {module.purpose}</p>}
      {module.readingSummary && (
        <p><strong>Reading Summary:</strong> {module.readingSummary.join(" ")}</p>
      )}

      {module.tasks.length > 0 && (
        <>
          <h2>Tasks:</h2>
          <ul>
            {module.tasks.map((task, idx) => (
              <li key={idx}>
                <strong>{task.type}:</strong> {task.prompt}
              </li>
            ))}
          </ul>
        </>
      )}

      {module.scenarios && module.scenarios.length > 0 && (
        <>
          <h2>Scenarios:</h2>
          <ul>
            {module.scenarios.map((scenario, idx) => (
              <li key={idx}>
                <strong>{scenario.title}:</strong> {scenario.description}
              </li>
            ))}
          </ul>
        </>
      )}

      {module.outcome && <p><strong>Outcome:</strong> {module.outcome.description}</p>}
      {module.nextModule && (
        <p><strong>Next Module:</strong> {module.nextModule.title}</p>
      )}
    </div>
  );
};

export default ModuleDisplay;
