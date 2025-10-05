"use client";

import React, { useState, useEffect } from "react";
import { runModule, initCandidateState } from "@/app/ai/aiLoop";
import { modules } from "@/config/modules";
import { CandidateState, Module } from "@/app/ai/types";
import ModuleDisplay from "@/app/components/ModuleDisplay";

const ChatSimulator: React.FC = () => {
  const [candidateState, setCandidateState] = useState<CandidateState | null>(null);
  const [currentModule, setCurrentModule] = useState<Module | null>(null);
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Initialize candidate state on load
  useEffect(() => {
    const initial = initCandidateState();
    setCandidateState(initial);
    setMessages([
      "🎙️ Welcome to the Federal Candidate Simulator — AI Edition.",
      "You’ll experience filing, compliance, messaging, and campaigning one step at a time.",
      "To begin, type the office you want to run for: President, Senate, or House."
    ]);
  }, []);

  const handleUserInput = async () => {
    if (!input.trim()) return;
    const userMsg = `🗣️ You: ${input}`;
    setMessages((prev) => [...prev, userMsg]);
    setIsLoading(true);

    let updatedState = candidateState;

    // Determine module selection
    if (!currentModule) {
      const office = input.trim().toLowerCase();
      let introMsg = "";

      if (office === "president") {
        introMsg = "🏛️ You’ve chosen to run for President. This path requires 50 Candidate Coins and 10% approval.";
      } else if (office === "senate") {
        introMsg = "🏛️ You’ve chosen to run for Senate. You’ll need 40 Candidate Coins and 7% approval.";
      } else if (office === "house") {
        introMsg = "🏛️ You’ve chosen to run for House. You’ll need 31 Candidate Coins and 2.5% approval.";
      } else {
        setMessages((prev) => [...prev, "❌ Please choose: President, Senate, or House."]);
        setIsLoading(false);
        setInput("");
        return;
      }

      setMessages((prev) => [...prev, introMsg, "🎯 Starting Module 1 – Filing Phase..."]);

      const mod = modules.find((m) => m.id === 1);
      setCurrentModule(mod || null);
      setIsLoading(false);
      setInput("");
      return;
    }

    // Run module logic
    if (currentModule && candidateState) {
      const response = await runModule(currentModule, input, candidateState);
      updatedState = response.updatedState;
      setMessages((prev) => [...prev, response.message]);
      setCandidateState(updatedState);

      // Move to next module automatically
      const nextModule = modules.find((m) => m.id === currentModule.id + 1);
      if (nextModule) {
        setMessages((prev) => [...prev, `➡️ Moving to ${nextModule.title}...`]);
        setCurrentModule(nextModule);
      } else {
        setMessages((prev) => [...prev, "🏁 Simulation complete. Great job, candidate!"]);
        setCurrentModule(null);
      }
    }

    setInput("");
    setIsLoading(false);
  };

  return (
    <div className="p-4 max-w-3xl mx-auto bg-white/90 rounded-2xl shadow-md border border-gray-200">
      <h2 className="text-2xl font-bold mb-4 text-center">🗳️ Federal Candidate Simulator</h2>
      <div className="h-[400px] overflow-y-auto p-3 border rounded-md bg-gray-50 mb-4">
        {messages.map((msg, i) => (
          <div key={i} className="mb-2 whitespace-pre-wrap">
            {msg}
          </div>
        ))}
        {isLoading && <div className="text-gray-500 italic">AI is thinking...</div>}
      </div>

      <div className="flex space-x-2">
        <input
          type="text"
          className="flex-1 border rounded-md p-2"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleUserInput()}
          placeholder="Type your response..."
        />
        <button
          onClick={handleUserInput}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
        >
          Send
        </button>
      </div>

      {currentModule && candidateState && (
        <div className="mt-4">
          <ModuleDisplay
            module={currentModule}
            candidateState={candidateState}
            setCandidateState={setCandidateState}
          />
        </div>
      )}
    </div>
  );
};

export default ChatSimulator;
