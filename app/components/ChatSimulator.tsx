"use client";

import React, { useState, useEffect, useRef } from "react";
import { Module, Task } from "@/app/ai/types";

// --- Simple Text-to-Speech wrapper ---
const speak = (text: string) => {
  if ("speechSynthesis" in window) {
    const utterance = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(utterance);
  }
};

// --- Simple Speech-to-Text wrapper (placeholder) ---
const useVoiceInput = (onResult: (text: string) => void, active: boolean) => {
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    if (!active || !("webkitSpeechRecognition" in window || "SpeechRecognition" in window)) return;

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = "en-US";

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      onResult(transcript);
    };

    recognitionRef.current = recognition;

    return () => recognition.stop();
  }, [active]);

  const startListening = () => recognitionRef.current?.start();

  return { startListening };
};

const ChatSimulator: React.FC = () => {
  const [modules, setModules] = useState<Module[]>([]);
  const [currentModuleIndex, setCurrentModuleIndex] = useState(0);
  const [currentTaskIndex, setCurrentTaskIndex] = useState(0);
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const currentModule = modules[currentModuleIndex];
  const currentTask = currentModule?.tasks?.[currentTaskIndex];

  // --- Voice input starts at Module 7 ---
  const { startListening } = useVoiceInput(
    (text: string) => handleUserInput(text),
    currentModuleIndex >= 7
  );

  // --- Load modules dynamically ---
  useEffect(() => {
    const loadModules = async () => {
      try {
        const mod0 = (await import("@/app/data/modules/module0.json")).default;
        const mod1 = (await import("@/app/data/modules/module1.json")).default;
        setModules([mod0, mod1]);
      } catch (err) {
        console.error("Error loading modules:", err);
      }
    };
    loadModules();
  }, []);

  // --- Initialize first task ---
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
  const handleUserInput = (overrideInput?: string) => {
    const userText = overrideInput ?? input;
    if (!userText.trim()) return;
    const userMsg = `🗣️ You: ${userText}`;
    setMessages((prev) => [...prev, userMsg]);
    setIsLoading(true);

    setTimeout(() => {
      processResponse(userText.trim());
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
        if (q && q.correct !== undefined) {
          const correctAnswer =
            typeof q.correct === "string"
              ? q.correct[0].toUpperCase()
              : String.fromCharCode(65 + q.correct); // 0 => "A"
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

      case "read":
      case "speak": {
        if (currentTask.type === "speak") speak(currentTask.prompt);
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
        speak(task.prompt); // optional TTS for quizzes
        setMessages((prev) => [
          ...prev,
          ...quizLines.filter((line): line is string => typeof line === "string")
        ]);
        break;
      }
      case "read":
      case "speak": {
        setMessages((prev) => [...prev, `📘 ${task.prompt}`]);
        if (task.type === "speak") speak(task.prompt);
        break;
      }
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

      {/* Show input AFTER task is displayed */}
      {currentTask && (
        <div className="flex space-x-2">
          {currentModuleIndex >= 7 ? (
            <button
              onClick={startListening}
              className="flex-1 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition"
            >
              🎤 Speak your answer
            </button>
          ) : (
            <>
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
                onClick={() => handleUserInput()}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
              >
                Send
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default ChatSimulator;
