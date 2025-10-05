"use client";

import React from "react";
import { Module, CandidateState } from "@/app/ai/types";

interface ModuleDisplayProps {
  module: Module;
  candidateState?: CandidateState;
  setCandidateState?: React.Dispatch<React.SetStateAction<CandidateState | null>>;
}

const ModuleDisplay: React.FC<ModuleDisplayProps> = ({ module }) => {
  return (
    <div className="p-4 bg-white rounded-2xl shadow-md border border-gray-200">
      <h1 className="text-2xl font-bold mb-2">{module.title}</h1>
      {module.narrator && <p className="mb-4 text-gray-700 italic">{module.narrator}</p>}
      {module.purpose && <p className="mb-4"><strong>Purpose:</strong> {module.purpose}</p>}

      {module.readingSummary && module.readingSummary.length > 0 && (
        <div className="mb-4">
          <h2 className="font-semibold mb-2">📖 Reading Summary</h2>
          <ul className="list-disc pl-6">
            {module.readingSummary.map((line, i) => (
              <li key={i}>{line}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="mb-4">
        <h2 className="font-semibold mb-2">📝 Tasks</h2>
        <ul className="list-disc pl-6 space-y-2">
          {module.tasks.map((task) => (
            <li key={task.id}>
              <strong>{task.type.toUpperCase()}:</strong> {task.prompt}
              {"questions" in task && task.questions?.length > 0 && (
                <ul className="list-decimal pl-6 mt-1">
                  {task.questions.map((q, i) => (
                    <li key={i}>
                      <p>{q.question}</p>
                      <ul className="list-none pl-4">
                        {q.options.map((opt, j) => (
                          <li key={j}>
                            <span className="text-sm text-gray-700">
                              {String.fromCharCode(65 + j)}. {opt}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>

      {module.sources && (
        <div>
          <h2 className="font-semibold mb-2">📚 Sources</h2>
          <ul className="list-disc pl-6">
            {module.sources.map((src, i) => (
              <li key={i}>{src}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ModuleDisplay;
