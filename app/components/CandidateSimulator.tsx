// File: app/components/CandidateSimulator.tsx
"use client";

import React, { useState, useEffect } from "react";
import { libertarianSimulator } from "../ai/libertarianSimulator";
import { ModuleState } from "../ai/moduleLogic";
import { speak } from "../ai/audioUtils"; // 👈 helper we wrote earlier

export default function CandidateSimulator() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [state, setState] = useState<ModuleState>({
    office: "House", // default until user picks
    cc: 50,
    signatures: 0,
    approval: 0,
  });
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const currentModule = libertarianSimulator[currentIndex];

  // 🔊 Speak narrator whenever module changes
  useEffect(() => {
    if (currentModule?.narrator) {
      speak(currentModule.narrator);
    }
  }, [currentModule]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!currentModule) return;

    let newState = { ...state };
    let text = "";

    if (currentModule.logic) {
      text = currentModule.logic(input, newState);
    } else {
      text = "No logic found for this module.";
    }

    setState(newState);
    setOutput(text);
    setInput("");

    // move to next module if not last
    if (currentIndex < libertarianSimulator.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto bg-white shadow rounded">
      <h2 className="text-xl font-bold mb-4">
        {currentModule?.title || "Candidate Simulator"}
      </h2>
      <p className="mb-2">{currentModule?.narrator}</p>
      <p className="mb-4 italic">{currentModule?.prompt}</p>

      <form onSubmit={handleSubmit} className="mb-4">
        <input
          type="text"
          className="border p-2 rounded w-full"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your response here..."
        />
        <button
          type="submit"
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
        >
          Submit
        </button>
      </form>

      {output && (
        <div className="p-3 bg-gray-100 rounded mb-4">
          <strong>Result:</strong> {output}
        </div>
      )}

      <div className="p-3 bg-gray-50 rounded">
        <p>
          <strong>Office:</strong> {state.office}
        </p>
        <p>
          <strong>CC:</strong> {state.cc}
        </p>
        <p>
          <strong>Signatures:</strong> {state.signatures}
        </p>
        <p>
          <strong>Approval:</strong> {state.approval.toFixed(1)}%
        </p>
      </div>
    </div>
  );
}
