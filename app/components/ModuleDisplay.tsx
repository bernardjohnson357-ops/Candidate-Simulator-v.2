// ./app/components/ModuleDisplay.tsx
"use client";

import React, { useState, useEffect } from "react";
import { CandidateState, Module, Task } from "@/app/ai/types";

interface ModuleDisplayProps {
  module: Module;
  candidateState: CandidateState;
  setCandidateState: React.Dispatch<React.SetStateAction<CandidateState | null>>;
}

const ModuleDisplay: React.FC<ModuleDisplayProps> = ({ module, candidateState, setCandidateState }) => {
  const [currentTaskIndex, setCurrentTaskIndex] = useState(0);

  // Display current task
  const displayTask = (task: Task) => {
    if (!task) return null;

    if (task.type === "quiz") {
      const quiz = task.questions?.[0];
      if (!quiz) return <p>🧩 {task.prompt}</p>;

      return (
        <div className="mt-2 p-2 border rounded bg-white">
          <p className="font-semibold">🧩 {quiz.question}</p>
          <ul className="list-disc ml-5 mt-1">
            {quiz.options.map((opt, idx) => (
              <li key={idx}>{opt}</li>
            ))}
          </ul>
          <p className="mt-1 text-sm text-gray-600">Please answer with A, B, C, or D in the input box below.</p>
        </div>
      );
    }

    if (task.type === "read") {
      return <p className="mt-2">📘 {task.prompt}</p>;
    }

    if (task.type === "write") {
      return (
        <div className="mt-2">
          <p>🖊️ {task.prompt}</p>
          {task.responsePlaceholder && <p className="text-sm text-gray-500">(Hint: {task.responsePlaceholder})</p>}
        </div>
      );
    }

    // Default
    return <p className="mt-2">📘 {task.prompt}</p>;
  };

  const currentTask = module.tasks?.[currentTaskIndex];

  return (
    <div className="border p-4 rounded-md bg-gray-100 mt-4">
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

      {currentTask && displayTask(currentTask)}

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
