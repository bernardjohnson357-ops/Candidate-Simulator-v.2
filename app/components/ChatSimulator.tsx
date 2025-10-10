// ./app/components/ChatSimulator.tsx
"use client";

import React, { useState, useEffect } from "react";
import { Module, Task } from "@/app/ai/types";

const ChatSimulator: React.FC<{ allModules: Module[] }> = ({ allModules }) => {
  const [currentModule, setCurrentModule] = useState<Module>(allModules[0]);
  const [currentTaskIndex, setCurrentTaskIndex] = useState(0);
  const [messages, setMessages] = useState<string[]>([]);
  const [userInput, setUserInput] = useState("");

  const currentTask = currentModule.tasks[currentTaskIndex];

  // -------------------------------------
  // 🧭 Universal button handler
  // -------------------------------------
  const handleButtonClick = (option: string) => {
    let feedback = "";

    if (currentTask.type === "quiz") {
      const correct = option === currentTask.answer;
      feedback = correct
        ? "✅ Correct!"
        : `❌ Incorrect. The right answer was "${currentTask.answer}".`;
    } else if (currentTask.type === "choice") {
      feedback = `You selected: ${option}`;
    }

    setMessages((prev) => [...prev, `${feedback}`]);

    setTimeout(() => {
      if (currentTaskIndex < currentModule.tasks.length - 1) {
        setCurrentTaskIndex((i) => i + 1);
      } else {
        setMessages((prev) => [...prev, "🎉 Module complete!"]);
      }
    }, 1500);
  };

  // -------------------------------------
  // 🧩 Render logic
  // -------------------------------------
  return (
    <div className="w-full max-w-3xl p-6 bg-white rounded-2xl shadow-md">
      <div className="min-h-[300px] space-y-3 overflow-y-auto mb-4">
        {messages.map((msg, i) => (
          <p key={i} className="text-gray-700">
            {msg}
          </p>
        ))}
        <p className="text-blue-700 font-semibold">{currentTask.prompt}</p>
      </div>

      {(currentTask.type === "quiz" || currentTask.type === "choice") &&
        currentTask.options && (
          <div className="flex flex-col gap-2">
            {currentTask.options.map((opt, i) => (
              <button
                key={i}
                onClick={() => handleButtonClick(opt)}
                className="px-4 py-2 bg-blue-100 hover:bg-blue-300 rounded-lg transition text-left"
              >
                {opt}
              </button>
            ))}
          </div>
        )}

      {currentTask.type === "read" && (
        <button
          onClick={() =>
            setCurrentTaskIndex((prev) => Math.min(prev + 1, currentModule.tasks.length - 1))
          }
          className="mt-4 px-4 py-2 bg-green-500 text-white rounded-lg"
        >
          Continue
        </button>
      )}
    </div>
  );
};

export default ChatSimulator;
