// ./app/components/ChatSimulator.tsx
"use client";

import React, { useState, useEffect } from "react";
import { modules } from "../data/modules";
import { CandidateState, Task } from "../ai/types";

const ChatSimulator: React.FC = () => {
  // ---------------------- State ----------------------
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [currentModuleIndex, setCurrentModuleIndex] = useState(0);
  const [currentTaskIndex, setCurrentTaskIndex] = useState(0);
  const [candidateState, setCandidateState] = useState<CandidateState | null>(null);
  const [awaitingOffice, setAwaitingOffice] = useState(false);

  const currentModule = modules[currentModuleIndex];
  const currentTask: Task | null =
    currentModule && currentModule.tasks ? currentModule.tasks[currentTaskIndex] : null;

  // ---------------------- Intro ----------------------
  useEffect(() => {
    if (messages.length === 0 && currentModule) {
      setMessages([
        `🎯 ${currentModule.title}`,
        currentModule.description,
        ...(currentModule.readingSummary?.map(line => `📘 ${line}`) || []),
        "Type 'start' when ready."
      ]);
    }
  }, [currentModule]);

  // ---------------------- Task Flow ----------------------

  const goToNextTask = () => {
    if (!currentModule) return;
    const nextIndex = currentTaskIndex + 1;

    if (nextIndex < (currentModule.tasks?.length || 0)) {
      setCurrentTaskIndex(nextIndex);
    } else {
      // Move to next module
      const nextModuleIndex = currentModuleIndex + 1;
      if (nextModuleIndex < modules.length) {
        setCurrentModuleIndex(nextModuleIndex);
        setCurrentTaskIndex(0);
      } else {
        setMessages(prev => [...prev, "🎉 Simulation complete! You've finished all modules."]);
      }
    }
  };

  const processResponse = (userInput: string) => {
    if (!currentTask) return;

    switch (currentTask.type) {
      case "read":
        setMessages(prev => [
          ...prev,
          "✅ Great! Let’s move to a quick quiz to check your understanding."
        ]);
        goToNextTask();
        break;

      case "quiz": {
        const q = currentTask.questions?.[0];
        if (q && q.correct) {
          const correctRaw = Array.isArray(q.correct) ? q.correct[0] : q.correct;
          const correctLetter = (correctRaw || "").trim()[0]?.toUpperCase() || "";
          const userLetter = (userInput || "").trim()[0]?.toUpperCase() || "";

          if (["A", "B", "C", "D"].includes(userLetter)) {
            if (userLetter === correctLetter) {
              setMessages(prev => [...prev, "✅ Correct! You earned +5 Candidate Coins."]);
              setCandidateState(prev => prev ? { ...prev, cc: (prev.cc ?? 0) + 5 } : { cc: 5 });
            } else {
              setMessages(prev => [...prev, `❌ Incorrect. The correct answer was: ${correctRaw}`]);
            }
          } else {
            setMessages(prev => [...prev, "❌ Please answer with A, B, C, or D."]);
            return; // Wait for valid input
          }
        } else {
          setMessages(prev => [...prev, "⚠️ Quiz data incomplete — skipping this question."]);
        }

        // After quiz: prompt office selection
        setMessages(prev => [
          ...prev,
          "🗳️ Now choose the office you want to run for. Type: President, Senate, or House."
        ]);
        setAwaitingOffice(true);
        return;
      }

      default:
        setMessages(prev => [...prev, "🤖 Task type not recognized."]);
        break;
    }
  };

  // ---------------------- Input Handling ----------------------

  const handleUserInput = () => {
    if (!input.trim()) return;
    const userInput = input.trim();
    const userMsg = `👤 ${userInput}`;
    setMessages(prev => [...prev, userMsg]);
    setIsLoading(true);

    // Handle office selection
    if (awaitingOffice) {
      const choice = userInput.toLowerCase();
      let selected: "President" | "Senate" | "House" | null = null;

      if (choice === "president") selected = "President";
      else if (choice === "senate") selected = "Senate";
      else if (choice === "house") selected = "House";

      if (!selected) {
        setMessages(prev => [...prev, "❌ Invalid choice. Type: President, Senate, or House."]);
        setInput("");
        setIsLoading(false);
        return;
      }

      setMessages(prev => [...prev, `✅ You selected: ${selected}. Loading next module...`]);
      setAwaitingOffice(false);
      setCandidateState(prev =>
        prev ? { ...prev, office: selected } : { office: selected, cc: 50, signatures: 0, voterApproval: 0 }
      );

      setCurrentModuleIndex(prev => prev + 1);
      setCurrentTaskIndex(0);
      setInput("");
      setIsLoading(false);
      return;
    }

    // Start the module if user types 'start'
    if (userInput.toLowerCase() === "start" && currentTask) {
      setMessages(prev => [...prev, "🚀 Starting the simulation..."]);
      goToNextTask();
      setInput("");
      setIsLoading(false);
      return;
    }

    // Process normal task flow
    processResponse(userInput);
    setInput("");
    setIsLoading(false);
  };

  // ---------------------- UI ----------------------

  return (
    <div className="flex flex-col w-full max-w-2xl mx-auto p-4 bg-gray-50 rounded-2xl shadow-md">
      <div className="flex-1 overflow-y-auto space-y-2 mb-4">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`p-3 rounded-lg whitespace-pre-line ${
              msg.startsWith("👤")
                ? "bg-blue-100 text-blue-800 self-end"
                : "bg-white text-gray-900"
            }`}
          >
            {msg}
          </div>
        ))}
        {isLoading && <div className="text-gray-500 italic">Processing...</div>}
      </div>

      <div className="flex space-x-2">
        <input
          className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
          value={input}
          placeholder="Type your response..."
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === "Enter" && handleUserInput()}
        />
        <button
          onClick={handleUserInput}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatSimulator;
