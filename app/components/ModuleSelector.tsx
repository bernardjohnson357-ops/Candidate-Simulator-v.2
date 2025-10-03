// app/components/ModuleSelector.tsx
"use client";
import React, { useState } from "react";
import { module0, module1 } from "@/config/modules";
import { Module } from "@/app/ai/types";

const modules: Module[] = [module0, module1];

export default function ModuleSelector() {
  const [activeModule, setActiveModule] = useState<Module | null>(null);

  if (activeModule) {
    return (
      <div>
        <h2>{activeModule.title}</h2>
        <p>{activeModule.description}</p>

        {activeModule.tasks.map((task) => (
          <div key={task.id} style={{ marginTop: "1rem" }}>
            <p>{task.prompt}</p>
            {task.type === "choice" &&
              task.options?.map((opt) => (
                <button
                  key={opt}
                  onClick={() => alert(`You chose: ${opt}`)}
                  style={{ marginRight: "0.5rem" }}
                >
                  {opt}
                </button>
              ))}
          </div>
        ))}

        <button onClick={() => setActiveModule(null)} style={{ marginTop: "2rem" }}>
          🔙 Back to Modules
        </button>
      </div>
    );
  }

  return (
    <div>
      <h1>Federal Candidate Simulator</h1>
      {modules.map((m) => (
        <button key={m.id} onClick={() => setActiveModule(m)} style={{ display: "block", margin: "1rem 0" }}>
          {m.title}
        </button>
      ))}
    </div>
  );
}
