"use client";

import React from "react";
import { Module } from "../ai/types";

interface Props {
  module: Module;
}

const ModuleDisplay: React.FC<Props> = ({ module }) => {
  return (
    <div className="p-4 border rounded-lg bg-gray-50 shadow-sm">
      <h2 className="text-xl font-bold">{module.title}</h2>
      <p className="mt-1 text-gray-700">{module.description}</p>

      {module.purpose && (
        <p className="mt-2">
          <strong>Purpose:</strong> {module.purpose}
        </p>
      )}

      {module.narrator && (
        <p className="mt-2">
          <strong>Narrator:</strong> {module.narrator}
        </p>
      )}

      {module.readingSummary && module.readingSummary.length > 0 && (
        <div className="mt-2">
          <strong>Reading Summary:</strong>
          <ul className="list-disc ml-5">
            {module.readingSummary.map((point, idx) => (
              <li key={idx}>{point}</li>
            ))}
          </ul>
        </div>
      )}

      {module.sources && module.sources.length > 0 && (
        <div className="mt-2">
          <strong>Sources:</strong>
          <ul className="list-disc ml-5">
            {module.sources.map((src, idx) => (
              <li key={idx}>{src}</li>
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

      {module.nextModuleId && (
        <p className="mt-2">
          <strong>Next Module ID:</strong> {module.nextModuleId}
        </p>
      )}
    </div>
  );
};

export default ModuleDisplay;
