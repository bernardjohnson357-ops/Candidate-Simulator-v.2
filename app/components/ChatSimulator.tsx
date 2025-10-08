// ./app/components/ChatSimulator.tsx
"use client";

import React, { useState, useEffect } from "react";
import { Module, Task, TaskType } from "@/app/ai/types";

const ChatSimulator: React.FC = () => {
  const [modules, setModules] = useState<Module[]>([]);
  const [currentModuleIndex, setCurrentModuleIndex] = useState(0);
  const [currentTaskIndex, setCurrentTaskIndex] = useState(0);
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const currentModule = modules[currentModuleIndex];
  const currentTask = currentModule?.tasks?.[currentTaskIndex];

  // --- Load modules dynamically ---
  useEffect(() => {
    const loadModules = async () => {
      try {
        const mod0Raw = await import("@/app/data/modules/module0.json");
        const mod1Raw = await import("@/app/data/modules/module1.json");

        const normalizeModule = (mod: any): Module => ({
          ...mod,
          tasks: mod.tasks.map((t: any) => ({
            ...t,
            type: t.type as TaskType, // ensure type is correct
            questions: t.questions?.map((q: any) => ({
              ...q,
              correct: Array.isArray(q.correct) ? q.correct : [q.correct], // always array
            })) || [],
          })),
        });

        setModules([normalizeModule(mod0Raw.default), normalizeModule(mod1Raw.default)]);
      } catch (err) {
        console.error("Error loading modules:", err);
      }
    };

    loadModules();
  }, []);

  // --- Initialize messages for the first module ---
  useEffect(() => {
    if (currentModule) {
      setMessages([
        `🎯 ${currentModule.title}`,
        currentModule.description || "",
      ]);
      if (currentModule.tasks?.length) {
        displayTask(currentModule.tasks[0]);
      }
    }
  }, [currentModule]);

  // --- Handle user input ---
  const handleUserInput = () => {
    if (!input.trim() || !currentTask) return;

    setMessages((prev) => [...prev, `🗣️ You: ${input}`]);
    setIsLoading(true);

    setTimeout(() => {
      processResponse(input.trim());
      setInput("");
      setIsLoading(false);
    }, 600);
  };

  // --- Process response for quiz/read tasks ---
  const processResponse = (userInput: string) => {
    if (!currentTask) return;

    switch (currentTask.type) {
      case "quiz": {
        const q = currentTask.questions?.[0];
        if (q && q.correct?.length) {
          const correctAnswer = q.correct[0]?.toUpperCase();
          const userAnswer = userInput[0]?.toUpperCase();

          setMessages((prev) => [
            ...prev,
            userAnswer === correctAnswer
              ? "✅ Correct! Candidate Coins (CC) = campaign energy and credibility."
              : `❌ Incorrect. The correct answer was: ${q.correct[0]}`,
          ]);
        } else {
          setMessages((prev) => [...prev, "⚠️ Quiz data incomplete — skipping question."]);
        }
        break;
      }

      case "read":
      case "speak":
        setMessages((prev) => [...prev, `📘 ${currentTask.prompt}`]);
        break;

      default:
        setMessages((prev) => [...prev, `📗 ${currentTask.prompt}`]);
        break;
    }

    goToNextTask();
  };

  // --- Move to next task or module ---
  const goToNextTask = () => {
    if (currentModule.tasks && currentTaskIndex < currentModule.tasks.length - 1) {
      setCurrentTaskIndex((prev) => prev + 1);
      displayTask(currentModule.tasks[currentTaskIndex + 1]);
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
        const quizLines = [`🧩 ${task.prompt}`, q?.question, ...(q?.options || [])];
        setMessages((prev) => [...prev, ...quizLines.filter((line): line is string => !!line)]);
        break;
      }
      case "read":
        setMessages((prev) => [...prev, `📘 ${task.prompt}`]);
        break;
      default:
        setMessages((prev) => [...prev, `📗 ${task.prompt}`]);
        break;
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <div className="h-[450px] overflow-y-auto p-4 border rounded-md bg-gray-50 mb-4">
        {messages.map((msg, i) => (
          <div key={i} className="mb-2 whitespace-pre-wrap">{msg}</div>
        ))}
        {isLoading && <div className="text-gray-500 italic">AI is thinking...</div>}
      </div>

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
