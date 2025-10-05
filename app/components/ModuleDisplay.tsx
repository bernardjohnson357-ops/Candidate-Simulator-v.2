"use client";

import React from "react";
import { Module, CandidateState } from "@/app/ai/types";

interface ModuleDisplayProps {
  module: Module;
  candidateState?: CandidateState;
  setCandidateState?: React.Dispatch<React.SetStateAction<CandidateState>>;
}

const ModuleDisplay: React.FC<ModuleDisplayProps> = ({
  module,
  candidateState,
  setCandidateState,
}) => {
  return (
    <div className="module-container">
      <h1>{module.title}</h1>

      {module.narrator && (
        <p>
          <strong>Narrator:</strong> {module.narrator}
        </p>
      )}

      {module.purpose && (
        <p>
          <strong>Purpose:</strong> {module.purpose}
        </p>
      )}

      {module.readingSummary && module.readingSummary.length > 0 && (
        <div>
          <strong>Reading Summary:</strong>
          <ul>
            {module.readingSummary.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      )}

      {module.tasks && module.tasks.length > 0 && (
        <div>
          <h2>Tasks:</h2>
          <ul>
            {module.tasks.map((task) => (
              <li key={task.id}>
                <strong>{task.type}:</strong> {task.prompt}
              </li>
            ))}
          </ul>
        </div>
      )}

      {module.scenarios && module.scenarios.length > 0 && (
        <div>
          <h2>Scenarios:</h2>
          <ul>
            {module.scenarios.map((scenario, index) => (
              <li key={index}>
                <strong>{scenario.title}:</strong> {scenario.description}
              </li>
            ))}
          </ul>
        </div>
      )}

      {module.outcome && (
        <p>
          <strong>Outcome:</strong> {module.outcome.description}
        </p>
      )}

      {module.nextModule && (
        <p>
          <strong>Next Module:</strong> {module.nextModule.title}
        </p>
      )}
    </div>
  );
};

export default ModuleDisplay;
