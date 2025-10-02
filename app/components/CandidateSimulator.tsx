// File: app/components/CandidateSimulator.tsx
"use client";

import React, { useState } from "react";
import { modules } from "../../config/modules"; // fixed path ✅
import { Module } from "../ai/types";

const CandidateSimulator: React.FC = () => {
  // Campaign state
  const [cc, setCc] = useState(50); // starting Candidate Coins
  const [signatures, setSignatures] = useState(0);
  const [approval, setApproval] = useState(0);

  // Active module
  const [activeModule, setActiveModule] = useState<Module | null>(null);

  // Helper: update campaign stats
  const updateStats = (deltaCc: number, deltaSignatures: number) => {
    setCc((prev) => prev + deltaCc);
    setSignatures((prev) => prev + deltaSignatures);

    // voter approval: 100 signatures = 1%
    const newSignatures = signatures + deltaSignatures;
    setApproval(Number((newSignatures / 100).toFixed(1)));
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar with module buttons */}
      <aside className="w-64 bg-gray-100 border-r p-4">
        <h2 className="text-lg font-semibold mb-4">Modules</h2>
        <div className="flex flex-col gap-2">
          {modules.map((m) => (
            <button
              key={m.id}
              className={`px-3 py-2 rounded-lg text-left transition ${
                activeModule?.id === m.id
                  ? "bg-blue-600 text-white"
                  : "bg-white hover:bg-blue-100 border"
              }`}
              onClick={() => setActiveModule(m)}
            >
              {m.title}
            </button>
          ))}
        </div>
      </aside>

      {/* Main content area */}
      <main className="flex-1 p-6">
        {/* Campaign status bar */}
        <div className="mb-6 flex gap-6 font-semibold">
          <span>💰 CC: {cc}</span>
          <span>🖊️ Signatures: {signatures}</span>
          <span>📊 Approval: {approval}%</span>
        </div>

        {/* Active module content */}
        {activeModule ? (
          <div>
            <h1 className="text-2xl font-bold mb-4">{activeModule.title}</h1>
            <div className="prose max-w-none">
              <p>{activeModule.content}</p>
            </div>

            {/* Example action to update stats */}
            <button
              onClick={() => updateStats(2, 100)}
              className="mt-6 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              ✅ Example: +2 CC & +100 signatures
            </button>
          </div>
        ) : (
          <p className="text-gray-500">Select a module to begin.</p>
        )}
      </main>
    </div>
  );
};

export default CandidateSimulator;
