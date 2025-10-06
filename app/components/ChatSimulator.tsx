"use client";

import React, { useState, useEffect } from "react";
import { CandidateState, Module, Task, QuizQuestion } from "@/app/ai/types";
import ModuleDisplay from "@/app/components/ModuleDisplay";
import { initCandidateState, safeRunModule } from "@/app/ai/aiLoop";

const ChatSimulator: React.FC = () => {
  const [candidateState, setCandidateState] = useState<CandidateState | null>(null);
  const [currentModule, setCurrentModule] = useState<Module | null>(null);
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState("");
  const [office, setOffice] = useState<"President" | "Senate" | "House" | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Welcome message
  useEffect(() => {
    setMessages([
      "🎙️ Welcome to the Federal Candidate Simulator — AI Edition.",
      "Type the office you want to run for: President, Senate, or House.",
    ]);
  }, []);

  // Load a module JSON dynamically
  const loadModule = async (id: string): Promise<Module | null> => {
    try {
      const mod = await import(`../data/modules/module${id}.json`);
      return mod.default as Module;
    } catch {
      return null;
    }
  };

  // Handle user input
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

      // Initialize candidate state
      const initState = initCandidateState(selected);
      setCandidateState(initState);

      // Load Module 0
      const module0: Module = {
        id: "0",
        title: "Orientation & Introduction",
        description: "Welcome to the Federal Candidate Simulator. Learn what Candidate Coins mean.",
        tasks: [
          {
            id: "task_module0_cc_quiz",
            type: "quiz",
            prompt:
              "What do Candidate Coins (CC) represent in this simulator?\n\nA) Campaign energy and credibility\nB) Real currency for campaign ads\nC) Signatures collected from voters\nD) Debate score multiplier",
            questions: [
              {
                id: "q1",
                question: "Select the correct answer:",
                options: ["A", "B", "C", "D"],
                correct: "A",
              },
            ],
          },
        ],
      };

      setCurrentModule(module0);
      setCandidateState((prev) => prev ? { ...prev, currentModuleId: module0.id } : null);

      setMessages((prev) => [
        ...prev,
        `🏛️ You’ve chosen to run for ${selected}.`,
        `🎯 Starting ${module0.title}...`,
      ]);

      setInput("");
      setIsLoading(false);
      return;
    }

    // Module progression
    if (currentModule && candidateState) {
      try {
        // Run the module and update candidate state
        const updatedState = safeRunModule(candidateState, currentModule);

        setCandidateState({
          ...updatedState,
          currentModuleId: (parseInt(currentModule.id) + 1).toString(),
        });

        setMessages((prev) => [
          ...prev,
          `📊 Module complete! Updated CC: ${updatedState.cc}, Signatures: ${updatedState.signatures}, Approval: ${updatedState.approval}%`,
        ]);

        // Load next module
        const nextId = (parseInt(currentModule.id) + 1).toString();
        const nextModule = await loadModule(nextId);

        if (nextModule) {
          setMessages((prev) => [...prev, `➡️ Moving to ${nextModule.title}...`]);
          setCurrentModule(nextModule);
        } else {
          setMessages((prev) => [...prev, "🏁 Simulation complete!"]);
          setCurrentModule(null);
        }

        setInput("");
      } catch (err) {
        console.error("Error running module:", err);
        setMessages((prev) => [...prev, "⚠️ An error occurred while progressing the module."]);
      } finally {
        setIsLoading(false);
      }
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
