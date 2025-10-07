"use client";

import React, { useState, useEffect } from "react";
import { CandidateState, Module, Task, QuizQuestion } from "@/app/ai/types";
import ModuleDisplay from "@/app/components/ModuleDisplay";
import { initCandidateState } from "@/app/ai/aiLoop";

const ChatSimulator: React.FC = () => {
  const [candidateState, setCandidateState] = useState<CandidateState | null>(null);
  const [currentModule, setCurrentModule] = useState<Module | null>(null);
  const [currentTaskIndex, setCurrentTaskIndex] = useState<number>(0);
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState("");
  const [office, setOffice] = useState<"President" | "Senate" | "House" | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // --- Welcome message ---
  useEffect(() => {
    setMessages([
      "🎙️ Welcome to the Federal Candidate Simulator — AI Edition.",
      "Type the office you want to run for: President, Senate, or House.",
    ]);
  }, []);

  // --- Load module dynamically ---
  const loadModule = async (id: string): Promise<Module | null> => {
    try {
      const mod = await import(`../data/modules/module${id}.json`);
      return mod.default as Module;
    } catch {
      return null;
    }
  };

  // --- Display current task ---
  const displayCurrentTask = (task: Task) => {
    if (!task) return;

    if (task.type === "quiz") {
      const quiz = task.questions?.[0];
      if (quiz) {
        const optionsText = quiz.options.map((opt, i) => `${String.fromCharCode(65 + i)}. ${opt}`).join("\n");
        setMessages((prev) => [...prev, `🧩 ${quiz.question}\n${optionsText}`]);
      } else {
        setMessages((prev) => [...prev, `🧩 ${task.prompt}`]);
      }
    } else if (task.type === "read") {
      setMessages((prev) => [...prev, `📘 ${task.prompt}`]);
    } else if (task.type === "write") {
      setMessages((prev) => [
        ...prev,
        `🖊️ ${task.prompt}`,
        task.responsePlaceholder ? `(Hint: ${task.responsePlaceholder})` : ""
      ]);
    } else {
      setMessages((prev) => [...prev, `📘 ${task.prompt}`]);
    }
  };

  // --- Handle user input ---
  const handleUserInput = async () => {
    if (!input.trim()) return;
    setMessages((prev) => [...prev, `🗣️ You: ${input}`]);
    setIsLoading(true);

    // Step 1: Office selection
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

      // Load first module
      const module0 = await loadModule("0");
      if (module0) {
        setCurrentModule(module0);
        setCurrentTaskIndex(0);
        setMessages((prev) => [
          ...prev,
          `🏛️ You’ve chosen to run for ${selected}.`,
          `🎯 Starting ${module0.title}...`,
          ...(module0.readingSummary || [])
        ]);

        // Display first task
        displayCurrentTask(module0.tasks[0]);
      }

      setInput("");
      setIsLoading(false);
      return;
    }

    // Step 2: Handle current task
    if (currentModule && candidateState) {
      const currentTask = currentModule.tasks?.[currentTaskIndex];
      if (!currentTask) {
        setIsLoading(false);
        return;
      }

      // Handle quiz
      if (currentTask.type === "quiz") {
        const quiz = currentTask.questions?.[0];
        const userAnswer = input.trim().toUpperCase();
        const correct = quiz?.correct?.charAt(0).toUpperCase(); // "A/B/C/D"

        if (!["A", "B", "C", "D"].includes(userAnswer)) {
          setMessages((prev) => [...prev, "❌ Please answer with A, B, C, or D."]);
          setInput("");
          setIsLoading(false);
          return;
        }

        if (userAnswer === correct) {
          setMessages((prev) => [...prev, "✅ Correct! You earned +5 Candidate Coins."]);
          setCandidateState((prev) => (prev ? { ...prev, cc: prev.cc + 5 } : prev));
        } else {
          setMessages((prev) => [...prev, `❌ Incorrect. The correct answer was ${correct}.`]);
        }
      }

      // --- Move to next task ---
      const nextIndex = currentTaskIndex + 1;
      if (currentModule.tasks && nextIndex < currentModule.tasks.length) {
        setCurrentTaskIndex(nextIndex);
        displayCurrentTask(currentModule.tasks[nextIndex]);
      } else {
        // Module complete, load next module
        setMessages((prev) => [...prev, `✅ ${currentModule.title} complete!`]);
        const nextModule = await loadModule(currentModule.nextModule?.id || "");
        if (nextModule) {
          setCurrentModule(nextModule);
          setCurrentTaskIndex(0);
          setMessages((prev) => [...prev, `➡️ Starting ${nextModule.title}...`]);
          displayCurrentTask(nextModule.tasks?.[0]);
        } else {
          setMessages((prev) => [...prev, "🏁 Simulation complete!"]);
          setCurrentModule(null);
        }
      }

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
