"use client";

import React from "react";
import { modules } from "@/config/modules";

type Props = {
  onSelect?: (id: string) => void;
};

const ModuleSelector: React.FC<Props> = ({ onSelect }) => {
  return (
    <div className="p-6 space-y-4">
      <h2 className="text-2xl font-bold">Select a Module</h2>
      <div className="grid gap-3">
        {modules.map((m) => (
          <button
            key={m.id}
            onClick={() => onSelect?.(m.id)}
            className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
          >
            {m.title}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ModuleSelector;
``
