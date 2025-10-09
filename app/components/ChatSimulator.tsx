// ./app/components/ChatSimulator.tsx
"use client";

import { speak } from "../utils/audioUtils";
import React, { useState } from "react";
import module0 from "../data/modules/module0.json";

interface CandidateState {
  office?: string;
  cc?: number;
  signatures?: number;
  voterApproval?: number;
}

const queueSpeak = (texts: string[]) => {
  let delay = 0;
  for (const line of texts) {
    setTimeout(() => speak(line), delay);
    delay += line.split(" ").length * 250; // rough timing
  }
};

const ChatSimulator: React.FC = () => {
  const [messages, setMessages] = useState<string[]>([
    "Welcome to the Federal Candidate Simulator!",
    "Type 'start' when ready."
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [currentModuleIndex, setCurrentModuleIndex] = useState(0);
  const [currentTaskIndex, setCurrentTaskIndex] = useState(0);
  const [candidateState, setCandidateState] = useState<CandidateState | null>(null);

  const modules = [module0];
  const currentModule = modules[currentModuleIndex];
  const currentTask = currentModule?.tasks?.[currentTaskIndex];

  // ---------------------- Task Navigation ----------------------
  const goToNextTask = () => {
    const nextTaskIndex = currentTaskIndex + 1;
    const moduleTasks = currentModule?.tasks || [];

    if (nextTaskIndex < moduleTasks.length) {
      setCurrentTaskIndex(nextTaskIndex);
      const nextTask = moduleTasks[nextTaskIndex];

      if (nextTask.type === "quiz" && nextTask.questions && nextTask.questions.length > 0) {
        const q = nextTask.questions[0];
        setMessages(prev => [
          ...prev,
          `🧩 ${q.question}`,
          `A) ${q.options[0]}  B) ${q.options[1]}  C) ${q.options[2]}  D) ${q.options[3]}`
        ]);
      } else if (nextTask.type === "read") {
        setMessages(prev => [...prev, `📘 ${nextTask.prompt}`]);
      }
    } else {
      setMessages(prev => [...prev, "🎉 You’ve completed this module!"]);
    }
  };

  // ---------------------- Response Processor ----------------------
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
              setCandidateState(prev =>
                prev
                  ? { ...prev, cc: (prev.cc ?? 0) + 5 }
                  : { cc: 5, office: "House", signatures: 0, voterApproval: 0 }
              );
            } else {
              setMessages(prev => [...prev, `❌ Incorrect. The correct answer was: ${correctRaw}`]);
            }
          } else {
            setMessages(prev => [...prev, "❌ Please answer with A, B, C, or D."]);
            return;
          }
        } else {
          setMessages(prev => [...prev, "⚠️ Quiz data incomplete — skipping this question."]);
        }

        goToNextTask();
        break;
      }

      default:
        setMessages(prev => [...prev, "🤖 Task type not recognized."]);
        break;
    }
  };

  // ---------------------- Input Handler ----------------------
  const handleUserInput = () => {
    if (!input.trim()) return;
    const userMsg = `👤 ${input}`;
    setMessages(prev => [...prev, userMsg]);
    setIsLoading(true);

    const userInput = input.trim();
    setInput("");

    if (userInput.toLowerCase() === "start") {
      setMessages(prev => [...prev, "🎬 Starting simulation..."]);

      const firstModule = modules[currentModuleIndex];
      if (!firstModule) {
        setMessages(prev => [...prev, "⚠️ No modules found."]);
        setIsLoading(false);
        return;
      }

      const firstTask = firstModule.tasks?.[0];
      if (firstTask) {
        if (firstTask.type === "read") {
          setMessages(prev => [...prev, `📘 ${firstTask.prompt}`]);
        } else if (firstTask.type === "quiz" && firstTask.questions && firstTask.questions.length > 0) {
          const q = firstTask.questions[0];
          setMessages(prev => [
            ...prev,
            `🧩 ${q.question}`,
            `A) ${q.options[0]}  B) ${q.options[1]}  C) ${q.options[2]}  D) ${q.options[3]}`
          ]);
        }
      }

      setIsLoading(false);
      return;
    }

    // Otherwise process normal task input
    processResponse(userInput);
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
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleUserInput()}
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
