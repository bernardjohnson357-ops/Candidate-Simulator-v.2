// ./app/components/ModuleDisplay.tsx
"use client";

import React, { useState } from "react";
import { CandidateState, Module, Task } from "@/app/ai/types";

interface ModuleDisplayProps {
  module: Module;
  candidateState: CandidateState;
  setCandidateState: React.Dispatch<React.SetStateAction<CandidateState | null>>;
}

const ModuleDisplay: React.FC<ModuleDisplayProps> = ({
  module,
  candidateState,
  setCandidateState,
}) => {
  const [currentTaskIndex, setCurrentTaskIndex] = useState(0);

  // ✅ Display the current task
  const displayTask = (task: Task) => {
    if (!task) return null;

    switch (task.type) {
      /** ───── 🧩 QUIZ TASK ───── */
      case "quiz": {
        const quiz = task.questions?.[0];
        if (!quiz)
          return (
            <p className="mt-2 text-gray-700">
              🧩 {task.prompt || "Quiz loading..."}
            </p>
          );

        return (
          <div className="mt-2 p-3 border rounded bg-white shadow-sm">
            <p className="font-semibold">🧩 {quiz.question}</p>
            <ul className="list-disc ml-5 mt-1 space-y-1">
              {quiz.options.map((opt, idx) => (
                <li key={idx}>
                  <span className="font-semibold">
                    {String.fromCharCode(65 + idx)}.
                  </span>{" "}
                  {opt}
                </li>
              ))}
            </ul>
            <p className="mt-2 text-sm text-gray-600 italic">
              Please answer with A, B, C, or D in the input box below.
            </p>
          </div>
        );
      }

      /** ───── 📘 READ TASK ───── */
      case "read":
        return (
          <p className="mt-2 text-gray-800 leading-relaxed">
            📘 {task.prompt}
          </p>
        );

      /** ───── ✍️ WRITE TASK ───── */
      case "write":
        return (
          <div className="mt-2">
            <p>🖊️ {task.prompt}</p>
            {task.responsePlaceholder && (
              <p className="text-sm text-gray-500 italic">
                Hint: {task.responsePlaceholder}
              </p>
            )}
          </div>
        );

      /** ───── 🗳️ CHOICE TASK ───── */
      case "choice":
        return (
          <div className="mt-2">
            <p className="font-semibold">{task.prompt}</p>
            {task.options && (
              <ul className="list-disc ml-5 mt-1">
                {task.options.map((opt, idx) => (
                  <li key={idx}>{opt}</li>
                ))}
              </ul>
            )}
          </div>
        );

      /** ───── 🎙️ SPEAK TASK ───── */
      case "speak":
        return (
          <p className="mt-2 text-gray-800">
            🎙️ {task.prompt}
          </p>
        );

      /** ───── 🖼️ UPLOAD TASK ───── */
      case "upload":
        return (
          <p className="mt-2 text-gray-800">
            📤 {task.prompt}
          </p>
        );

      /** ───── FALLBACK ───── */
      default:
        return <p className="mt-2 text-gray-800">📘 {task.prompt}</p>;
    }
  };

  const currentTask = module.tasks?.[currentTaskIndex];

  return (
    <div className="border p-4 rounded-md bg-gray-100 mt-4 shadow-md">
      {/* 🏷 Module Title */}
      <h3 className="text-xl font-semibold">{module.title}</h3>

      {/* 📖 Description */}
      {module.description && <p className="mt-2">{module.description}</p>}

      {/* 📘 Reading Summary */}
      {module.readingSummary?.length > 0 && (
        <div className="mt-3">
          <strong>Reading Summary:</strong>
          <div className="mt-1 space-y-2">
            {module.readingSummary.map((line, idx) => (
              <p key={idx} className="leading-relaxed">
                {line}
              </p>
            ))}
          </div>
        </div>
      )}

      {/* 🎯 Purpose */}
      {module.purpose && (
        <p className="mt-3">
          <strong>Purpose:</strong> {module.purpose}
        </p>
      )}

      {/* 🧩 Current Task */}
      {currentTask && displayTask(currentTask)}

      {/* ⚖️ Scenarios */}
      {module.scenarios?.length > 0 && (
        <div className="mt-3">
          <strong>Scenarios:</strong>
          <ul className="list-disc ml-5">
            {module.scenarios.map((scenario: any, idx: number) => (
              <li key={idx}>
                <strong>{scenario.title}:</strong> {scenario.description}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* 🧾 Outcome */}
      {module.outcome && (
        <p className="mt-3">
          <strong>Outcome:</strong>{" "}
          {typeof module.outcome === "string"
            ? module.outcome
            : JSON.stringify(module.outcome)}
        </p>
      )}

      {/* ⏭ Next Module */}
      {module.nextModule && (
        <p className="mt-3">
          <strong>Next Module:</strong> {module.nextModule.title}
        </p>
      )}
    </div>
  );
};

export default ModuleDisplay;
