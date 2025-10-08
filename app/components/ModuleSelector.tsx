// ./app/components/ModuleSelector.tsx
"use client";

import React, { useState, useEffect } from "react";
import { Module, Task, TaskType } from "@/app/ai/types";

const ModuleSelector: React.FC = () => {
  const [modules, setModules] = useState<Module[]>([]);
  const [selectedModuleId, setSelectedModuleId] = useState<string | null>(null);

  useEffect(() => {
    const loadModules = async () => {
      try {
        const mod0Raw = await import("@/app/data/modules/module0.json");
        const mod1Raw = await import("@/app/data/modules/module1.json");

        const normalizeModule = (mod: any): Module => ({
          ...mod,
          tasks: mod.tasks.map((t: any) => ({
            ...t,
            type: t.type as TaskType,
            questions: t.questions?.map((q: any) => ({
              ...q,
              correct: Array.isArray(q.correct) ? q.correct : [q.correct],
            })) || [],
          })),
        });

        setModules([normalizeModule(mod0Raw.default), normalizeModule(mod1Raw.default)]);
      } catch (err) {
        console.error("Error loading modules:", err);
      }
    };

    loadModules();
  }, []);

  const handleSelectModule = (id: string) => {
    setSelectedModuleId(id);
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Select a Module</h2>
      <ul>
        {modules.map((mod) => (
          <li key={mod.id} className="mb-2">
            <button
              className={`px-4 py-2 rounded ${
                selectedModuleId === mod.id ? "bg-blue-600 text-white" : "bg-gray-200"
              }`}
              onClick={() => handleSelectModule(mod.id)}
            >
              {mod.title}
            </button>
          </li>
        ))}
      </ul>

      {selectedModuleId && (
        <div className="mt-4 p-4 border rounded bg-gray-50">
          <h3 className="font-semibold">
            {modules.find((m) => m.id === selectedModuleId)?.title}
          </h3>
          <p className="mt-2">
            {modules.find((m) => m.id === selectedModuleId)?.description}
          </p>
        </div>
      )}
    </div>
  );
};

export default ModuleSelector;
