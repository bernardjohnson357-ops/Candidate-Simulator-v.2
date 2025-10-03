"use client";

import React, { useState } from "react";
import { modules } from "@/config/modules";

const ModuleSelector: React.FC = () => {
  const [activeModule, setActiveModule] = useState<string | null>(null);

  const selected = modules.find((m) => m.id === activeModule);

  return (
    <div className="p-6 space-y-6">
      {!activeModule ? (
        <>
          <h2 className="text-2xl font-bold">Select a Module</h2>
          <div className="grid gap-3">
            {modules.map((m) => (
              <button
                key={m.id}
                onClick={() => setActiveModule(m.id)}
                className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
              >
                {m.title}
              </button>
            ))}
          </div>
        </>
      ) : (
        <div>
          <h2 className="text-2xl font-bold mb-4">{selected?.title}</h2>
          <div className="prose whitespace-pre-wrap">{selected?.content}</div>
        </div>
      )}
    </div>
  );
};

export default ModuleSelector;
