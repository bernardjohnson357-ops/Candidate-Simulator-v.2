"use client";

import React from "react";
import { CandidateState, Module, Task } from "@/app/ai/types";

interface ModuleDisplayProps {
  module: Module;
  candidateState: CandidateState | null;
  setCandidateState: React.Dispatch<React.SetStateAction<CandidateState | null>>;
}

const ModuleDisplay: React.FC<ModuleDisplayProps> = ({
  module,
  candidateState,
  setCandidateState,
}) => {
  if (!candidateState) return null; // safety check

  return (
    <div className="module-container p-4 border rounded-md bg-gray-50">
      <h1 className="text-xl font-bold">{module.title}</h1>

      {module.narrator && (
        <p className="mt-2">
          <strong>Narrator:</strong> {module.narrator}
        </p>
      )}

      {module.purpose && (
        <p className="mt-1">
          <strong>Purpose:</strong> {module.purpose}
        </p>
      )}

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

     {module.tasks && module.tasks.length > 0 && (
  <div className="mt-2">
    <strong>Tasks:</strong>
    <ul className="list-decimal ml-5">
      {module.tasks.map((task: Task, idx) => (
        <li key={idx}>
          <strong>{task.type}:</strong> {task.prompt}
        </li>
      ))}
    </ul>
  </div>
)}

{module.scenarios && module.scenarios.length > 0 && (
  <div className="mt-2">
    <strong>Scenarios:</strong>
    <ul className="list-disc ml-5">
      {module.scenarios.map((scenario, idx) => (
        <li key={idx}>
          <strong>{scenario.title}:</strong> {scenario.description}
        </li>
      ))}
    </ul>
  </div>
)}

{module.outcome && (
  <p className="mt-2">
    <strong>Outcome:</strong>{" "}
    {Array.isArray(module.outcome)
      ? module.outcome.join(" ")
      : module.outcome}
  </p>
)}

{module.nextModule && (
  <p className="mt-2">
    <strong>Next Module:</strong> {module.nextModule.title}
  </p>
)}
      <div className="mt-2">
        <p>
          <strong>Candidate State:</strong> {candidateState.office} | CC:{" "}
          {candidateState.cc} | Signatures: {candidateState.signatures} | Approval:{" "}
          {candidateState.approval}%
        </p>
      </div>
    </div>
  );
};

export default ModuleDisplay;
