"use client";

import React, { useState, useEffect } from "react";
import { CandidateState, Module, Task } from "@/app/ai/types";
import ModuleDisplay from "@/app/components/ModuleDisplay";
import { initCandidateState, safeRunModule } from "@/app/ai/aiLoop";

const ChatSimulator: React.FC = () => {
  const [candidateState, setCandidateState] = useState<CandidateState | null>(null);
  const [currentModule, setCurrentModule] = useState<Module | null>(null);
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState("");
  const [office, setOffice] = useState<"President" | "Senate" | "House" | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [currentTaskIndex, setCurrentTaskIndex] = useState<number>(0);

  // --- Welcome message ---
  useEffect(() => {
    setMessages([
      "🎙️ Welcome to the Federal Candidate Simulator — AI Edition.",
      "Type the office you want to run for: President, Senate, or House.",
    ]);
  }, []);

  // --- Utility to load modules dynamically ---
  const loadModule = async (id: string): Promise<Module | null> => {
    try {
      const mod = await import(`../data/modules/module${id}.json`);
      return mod.default as Module;
    } catch {
      return null;
    }
  };

  // --- Display next task or move to next module ---
  const showNextTaskOrModule = async (module: Module) => {
    const tasks = module.tasks || [];
    const nextIndex = currentTaskIndex + 1;

    if (nextIndex < tasks.length) {
      const nextTask = tasks[nextIndex];
      setMessages((prev) => [...prev, `📘 ${nextTask.prompt}`]);
      setCurrentTaskIndex(nextIndex);
    } else {
      // Module finished
      setMessages((prev) => [...prev, `✅ ${module.title} complete!`]);
      const nextModule = await loadModule(module.nextModule?.id || "");
      if (nextModule) {
        setCurrentModule(nextModule);
        setCurrentTaskIndex(0);
        setMessages((prev) => [...prev, `➡️ Starting ${nextModule.title}...`]);
        if (nextModule.tasks?.length) {
          setMessages((prev) => [...prev, nextModule.tasks[0].prompt]);
        }
      } else {
        setMessages((prev) => [...prev, "🏁 Simulation complete!"]);
        setCurrentModule(null);
      }
    }
  };

  // --- Main input handler ---
  const handleUserInput = async () => {
    if (!input.trim()) return;
    setMessages((prev) => [...prev, `🗣️ You: ${input}`]);
    setIsLoading(true);

    // Step 1: Choose office (only once)
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

      // Load first module (Module 0)
      const mod0Import = await import("../data/modules/module0.json");
      const module0 = mod0Import.default as Module;

      setCurrentModule(module0);
      setCandidateState((prev) =>
        prev ? { ...prev, currentModuleId: module0.id } : prev
      );

      setMessages((prev) => [
        ...prev,
        `🏛️ You’ve chosen to run for ${selected}.`,
        `🎯 Starting ${module0.title}...`,
        ...(module0.readingSummary || []),
        module0.tasks?.[0]?.prompt || "No tasks found for this module.",
      ]);

      setCurrentTaskIndex(0);
      setInput("");
      setIsLoading(false);
      return;
    }

    // Step 2: If module and tasks exist, move through them step by step
    if (currentModule && candidateState) {
      const currentTask = currentModule.tasks?.[currentTaskIndex];

      // --- Handle quizzes or specific input types ---
      if (currentTask?.type === "quiz") {
        const answer = input.trim().toUpperCase();
        const correct = currentTask.correctAnswer?.toUpperCase();

        if (!answer || !["A", "B", "C", "D"].includes(answer)) {
          setMessages((prev) => [...prev, "❌ Please answer with A, B, C, or D."]);
          setInput("");
          setIsLoading(false);
          return;
        }

        let feedback = "";
        if (answer === correct) {
          feedback = "✅ Correct! You earned +5 Candidate Coins.";
          setCandidateState((prev) => (prev ? { ...prev, cc: prev.cc + 5 } : prev));
        } else {
          feedback = `❌ Incorrect. The correct answer was ${correct}.`;
        }

        setMessages((prev) => [...prev, feedback]);
        await showNextTaskOrModule(currentModule);
        setInput("");
        setIsLoading(false);
        return;
      }

      // --- For read/write/upload tasks ---
      await showNextTaskOrModule(currentModule);
      setInput("");
      setIsLoading(false);
      return;
    }

    setIsLoading(false);
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
