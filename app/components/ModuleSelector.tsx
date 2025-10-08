// ./app/components/ModuleSelector.tsx
"use client";

import React, { useEffect, useState } from "react";
import { Module } from "@/app/ai/types";

const ModuleSelector: React.FC = () => {
  const [modules, setModules] = useState<Module[]>([]);

  useEffect(() => {
    const loadModules = async () => {
      try {
        const mod0 = await import("@/app/data/modules/module0.json");
        const mod1 = await import("@/app/data/modules/module1.json");
        setModules([mod0.default, mod1.default]);
      } catch (error) {
        console.error("Error loading modules:", error);
      }
    };

    loadModules();
  }, []);

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-xl font-semibold mb-4">📚 Select a Module</h2>
      <ul className="space-y-3">
        {modules.map((mod) => (
          <li
            key={mod.id}
            className="border rounded-lg p-4 bg-white shadow hover:bg-blue-50 transition"
          >
            <h3 className="text-lg font-medium">{mod.title}</h3>
            <p className="text-sm text-gray-700 mt-1">{mod.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ModuleSelector;
