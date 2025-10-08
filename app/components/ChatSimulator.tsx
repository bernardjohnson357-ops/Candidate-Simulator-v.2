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

  const [candidateState, setCandidateState] = useState<{
  office?: "President" | "Senate" | "House";
  cc?: number;
  signatures?: number;
  approval?: number;
}>({
  cc: 50,           // starting CC
  signatures: 0,
  approval: 0
});

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
// 1️⃣ Track if the user has selected office
const [awaitingOffice, setAwaitingOffice] = useState(false);

// 2️⃣ In processResponse, after quiz task
if (currentTask.type === "quiz") {
  const q = currentTask.questions?.[0];
  if (q) {
    const correctAnswer = q.correct[0];
    const userAnswer = userInput[0]?.toUpperCase() || "";
    setMessages(prev => [
      ...prev,
      userAnswer === correctAnswer[0]
        ? "✅ Correct! You understand CC."
        : `❌ Incorrect. The correct answer was: ${correctAnswer}`
    ]);
  }

  // Now prompt for office selection
  setMessages(prev => [...prev, "Please select your office: President, Senate, or House"]);
  setAwaitingOffice(true);
  return; // stop here until office is chosen
}

// 3️⃣ Handle office selection
if (awaitingOffice) {
  const office = userInput.trim() as "President" | "Senate" | "House";
  if (["President", "Senate", "House"].includes(office)) {
    setCandidateState(prev => ({ ...prev!, office }));
    setMessages(prev => [...prev, `✅ You selected: ${office}`]);
    setAwaitingOffice(false);

    // Advance to next module
    setCurrentModuleIndex(prev => prev + 1);
    setCurrentTaskIndex(0);
  } else {
    setMessages(prev => [...prev, "⚠️ Invalid selection. Please type President, Senate, or House."]);
  }
}

      goToNextTask();
      break;
    }

    case "read":
    case "write":
      goToNextTask();
      break;

    default:
      goToNextTask();
      break;
  }
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
