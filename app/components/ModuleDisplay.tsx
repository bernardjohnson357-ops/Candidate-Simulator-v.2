"use client";

import React from "react";

interface Task {
  type: string;
  prompt: string;
}

interface Scenario {
  name: string;
  description: string;
}

interface Module {
  id: number;
  title: string;
  narrator: string;
  purpose: string;
  readingSummary: string;
  tasks: Task[];
  scenarios: Scenario[];
  outcome: string;
  nextModule: number;
}

interface ModuleDisplayProps {
  module: Module;
}

const ModuleDisplay: React.FC<ModuleDisplayProps> = ({ module }) => {
  return (
    <div className="module-container">
      <h1>{module.title}</h1>
      <p><strong>Narrator:</strong> {module.narrator}</p>
      <p><strong>Purpose:</strong> {module.purpose}</p>
      <p><strong>Reading Summary:</strong> {module.readingSummary}</p>

      <h2>Tasks:</h2>
      <ul>
        {module.tasks.map((task, index) => (
          <li key={index}>
            <strong>{task.type}:</strong> {task.prompt}
          </li>
        ))}
      </ul>

      <h2>Scenarios:</h2>
      <ul>
        {module.scenarios.map((scenario, index) => (
          <li key={index}>
            <strong>{scenario.name}:</strong> {scenario.description}
          </li>
        ))}
      </ul>

      <p><strong>Outcome:</strong> {module.outcome}</p>
      <p><strong>Next Module:</strong> {module.nextModule}</p>
    </div>
  );
};

export default ModuleDisplay;
