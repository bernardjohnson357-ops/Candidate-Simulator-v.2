"use client";

import React, { useState, useEffect } from "react";
import { Module, Task } from "@/app/ai/types";

const ChatSimulator: React.FC = () => {
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState("");
  const [currentModuleIndex, setCurrentModuleIndex] = useState(0);
  const [currentTaskIndex, setCurrentTaskIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const currentModule = modules[currentModuleIndex];
  const currentTask = currentModule?.tasks?.[currentTaskIndex];

  // --- Initialize ---
  useEffect(() => {
    if (currentModule) {
      setMessages([`📘 ${currentModule.title}`, currentModule.description]);
    }
  }, [currentModuleIndex]);

  // --- Handle user input ---
  const handleUserInput = () => {
    if (!input.trim()) return;

    const userMsg = `🗣️ You: ${input}`;
    setMessages((prev) => [...prev, userMsg]);
    setIsLoading(true);

    setTimeout(() => {
      processResponse(input.trim());
      setInput("");
      setIsLoading(false);
    }, 600);
  };

  // --- Handle logic per task type ---
  const processResponse = (userInput: string) => {
  if (!currentTask) return;

  switch (currentTask.type) {
    case "quiz": {
      const q = currentTask.questions?.[0];
      if (q && q.correct) {
        const correctAnswer = q.correct[0]?.toUpperCase() || "";
        const userAnswer = userInput[0]?.toUpperCase() || "";

        if (userAnswer === correctAnswer) {
          setMessages((prev) => [
            ...prev,
            "✅ Correct! Candidate Coins (CC) = campaign energy and credibility."
          ]);
        } else {
          setMessages((prev) => [
            ...prev,
            `❌ Incorrect. The correct answer was: ${q.correct}`
          ]);
        }
      } else {
        setMessages((prev) => [
          ...prev,
          "⚠️ Quiz data incomplete — skipping this question."
        ]);
      }

      goToNextTask();
      break;
    }

    case "read": {
      goToNextTask();
      break;
    }

    default:
      goToNextTask();
      break;
  }
};

  // --- Move to next task or module ---
  const goToNextTask = () => {
    if (currentModule.tasks && currentTaskIndex < currentModule.tasks.length - 1) {
      const next = currentModule.tasks[currentTaskIndex + 1];
      displayTask(next);
      setCurrentTaskIndex((prev) => prev + 1);
    } else if (modules.length > currentModuleIndex + 1) {
      setMessages((prev) => [...prev, `✅ Module "${currentModule.title}" complete.`]);
      setCurrentModuleIndex((prev) => prev + 1);
      setCurrentTaskIndex(0);
    } else {
      setMessages((prev) => [...prev, "🎉 All modules complete!"]);
    }
  };

  // --- Display task content ---
  const displayTask = (task: Task) => {
    switch (task.type) {
      case "quiz": {
        const q = task.questions?.[0];
        const quizLines = [
          `🧩 ${task.prompt}`,
          q?.question,
          ...(q?.options || []),
        ];
        setMessages((prev) => [...prev, ...quizLines.filter((line): line is string => typeof line === "string")]);
        break;
      }
      case "read": {
        setMessages((prev) => [...prev, `📘 ${task.prompt}`]);
        break;
      }
      default:
        setMessages((prev) => [...prev, `📗 ${task.prompt}`]);
        break;
    }
  };

  // --- Display first task on load ---
  useEffect(() => {
    if (currentModule && currentModule.tasks?.length) {
      displayTask(currentModule.tasks[0]);
    }
  }, [currentModuleIndex]);

  return (
    <div className="max-w-3xl mx-auto p-4">
      <div className="h-[450px] overflow-y-auto p-4 border rounded-md bg-gray-50 mb-4">
        {messages.map((msg, i) => (
          <div key={i} className="mb-2 whitespace-pre-wrap">{msg}</div>
        ))}
        {isLoading && <div className="text-gray-500 italic">AI is thinking...</div>}
      </div>

      {/* Show input AFTER task is displayed */}
      {currentTask && (
        <div className="flex space-x-2">
          <input
            type="text"
            className="flex-1 border rounded-md p-2"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleUserInput()}
            placeholder={
              currentTask.type === "quiz"
                ? "Answer A, B, C, or D..."
                : "Press Enter to continue..."
            }
          />
          <button
            onClick={handleUserInput}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
          >
            Send
          </button>
        </div>
      )}
    </div>
  );
};

export default ChatSimulator;
