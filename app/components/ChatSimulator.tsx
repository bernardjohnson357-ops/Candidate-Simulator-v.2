"use client";

import React, { useState, useEffect } from "react";
import { runModule, initCandidateState } from "@/app/ai/aiLoop";
import { CandidateState, Module } from "@/app/ai/types";
import ModuleDisplay from "@/app/components/ModuleDisplay";

const ChatSimulator: React.FC = () => {
  const [candidateState, setCandidateState] = useState<CandidateState | null>(null);
  const [currentModule, setCurrentModule] = useState<Module | null>(null);
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState("");
  const [office, setOffice] = useState<"President" | "Senate" | "House" | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setMessages([
      "🎙️ Welcome to the Federal Candidate Simulator — AI Edition.",
      "Type the office you want to run for: President, Senate, or House.",
    ]);
  }, []);

  const loadModule = async (id: string): Promise<Module | null> => {
    try {
      const mod = await import(`../data/modules/module${id}.json`);
      return mod.default as Module;
    } catch {
      return null;
    }
  };

  const handleUserInput = async () => {
    if (!input.trim()) return;

    setMessages((prev) => [...prev, `🗣️ You: ${input}`]);
    setIsLoading(true);

    // Office selection
    if (!office) {
      const choice = input.trim().toLowerCase();
      let selected: "President" | "Senate" | "House" | null = null;

      if (choice === "president") selected = "President";
      else if (choice === "senate") selected = "Senate";
      else if (choice === "house") selected = "House";

      if (!selected) {
        setMessages((prev) => [...prev, "❌ Please choose: President, Senate, or House."]);
        setIsLoading(false);
        setInput("");
        return;
      }

      setOffice(selected);
      const initState = initCandidateState(selected);
      setCandidateState(initState);

      const mod = await loadModule("0"); // Module 0 for quiz
      setCurrentModule(mod);
      setMessages((prev) => [
        ...prev,
        `🏛️ You’ve chosen to run for ${selected}.`,
        mod ? `🎯 Starting ${mod.title}...` : "⚠️ Could not load Module 0.",
      ]);

      setInput("");
      setIsLoading(false);
      return;
    }

    // Module progression
    if (currentModule && candidateState) {
      const updated = runModule(currentModule, candidateState);

      setCandidateState({
        ...updated,
        currentModuleId: (parseInt(currentModule.id.replace("module_", "")) + 1).toString(),
      });

      setMessages((prev) => [
        ...prev,
        `📊 Module complete! Updated CC: ${updated.cc}, Signatures: ${updated.signatures}, Approval: ${updated.approval}%`,
      ]);

      const nextId = (parseInt(currentModule.id.replace("module_", "")) + 1).toString();
      const nextModule = await loadModule(nextId);

      if (nextModule) {
        setMessages((prev) => [...prev, `➡️ Moving to ${nextModule.title}...`]);
        setCurrentModule(nextModule);
      } else {
        setMessages((prev) => [...prev, "🏁 Simulation complete!"]);
        setCurrentModule(null);
      }

      setInput("");
      setIsLoading(false);
    }
  };

  return (
    <div className="p-4 max-w-3xl mx-auto bg-white/90 rounded-2xl shadow-md border border-gray-200">
      <h2 className="text-2xl font-bold mb-4 text-center">🗳️ Federal Candidate Simulator</h2>

      <div className="h-[400px] overflow-y-auto p-3 border rounded-md bg-gray-50 mb-4">
        {messages.map((msg, i) => (
          <div key={i} className="mb-2 whitespace-pre-wrap">{msg}</div>
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
        <ModuleDisplay
          module={currentModule}
          candidateState={candidateState}
          setCandidateState={setCandidateState}
        />
      )}
    </div>
  );
};

export default ChatSimulator;
