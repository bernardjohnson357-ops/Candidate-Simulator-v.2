// ./app/components/ChatSimulator.tsx
"use client";

import React, { useState } from "react";
import { speak } from "../utils/audioUtils";
import { allModules } from "@/app/data/allModules";
import { Module, Task, CandidateState } from "@/app/ai/types";

const ChatSimulator: React.FC = () => {
  const [messages, setMessages] = useState<string[]>([
    "Welcome to the Federal Candidate Simulator!",
    "Click 'Start' when ready.",
  ]);
  const [currentModule, setCurrentModule] = useState<Module>(() => allModules[0]);
  const [candidateState, setCandidateState] = useState<CandidateState>({
    office: "",
    cc: 50,
    signatures: 0,
    voterApproval: 0,
  });
  const [quizAnswered, setQuizAnswered] = useState(false);
  const [selectedOffice, setSelectedOffice] = useState<string | null>(null);
  const [currentTaskIndex, setCurrentTaskIndex] = useState(0);

  // ---------- Audio helper ----------
  const queueSpeak = (lines: string[]) => {
    let delay = 0;
    for (const line of lines) {
      setTimeout(() => speak(line), delay);
      delay += line.split(" ").length * 250;
    }
  };

  // ---------- Handle quiz answer ----------
  const handleQuizAnswer = (letter: string) => {
    const task = currentModule.tasks[currentTaskIndex];
    if (task.type !== "quiz") return;

    const correctLetter = task.questions?.[0].correct[0].toUpperCase();
    if (letter === correctLetter) {
      setMessages((prev) => [
        ...prev,
        `✅ Correct! You earned +5 Candidate Coins.`,
      ]);
      setCandidateState((prev) => ({ ...prev, cc: (prev.cc ?? 0) + 5 }));
      queueSpeak(["Correct! You earned five Candidate Coins."]);
    } else {
      setMessages((prev) => [
        ...prev,
        `❌ Incorrect. The correct answer was: ${correctLetter}`,
      ]);
      queueSpeak([`Incorrect. The correct answer was ${correctLetter}`]);
    }
    setQuizAnswered(true);
  };

  // ---------- Handle office selection ----------
  const handleOfficeSelect = (office: string) => {
    setSelectedOffice(office);
    setCandidateState((prev) => ({ ...prev, office }));
    setMessages((prev) => [
      ...prev,
      `✅ You selected: ${office.toUpperCase()}`,
      `🎉 ${currentModule.title} complete! Preparing next module...`,
    ]);
    queueSpeak([
      `You selected ${office}. ${currentModule.title} complete! Preparing next module...`,
    ]);

    // Load next module after 3 seconds
    if (currentModule.nextModule) {
      setTimeout(() => {
        const nextMod = allModules.find((m) => m.id === currentModule.nextModule?.id);
        if (!nextMod) {
          setMessages((prev) => [...prev, "⚠️ Next module not found."]);
          return;
        }
        setCurrentModule(nextMod);
        setQuizAnswered(false);
        setSelectedOffice(null);
        setCurrentTaskIndex(0);

        setMessages((prev) => [
          ...prev,
          `📘 ${nextMod.title}: ${nextMod.description}`,
          ...nextMod.readingSummary,
          `✅ Click 'Start' to begin the next module.`,
        ]);
        queueSpeak([
          `${nextMod.title}: ${nextMod.description}`,
          "Click start to begin the next module.",
        ]);
      }, 3000);
    }
  };

  // ---------- Handle Start/Next ----------
  const handleStart = () => {
    const task = currentModule.tasks[currentTaskIndex];
    setMessages((prev) => [
      ...prev,
      "🎬 Starting module...",
      `${task.prompt}`,
    ]);
    queueSpeak([task.prompt]);
  };

  // ---------- Render task options ----------
  const renderTaskOptions = () => {
    const task = currentModule.tasks[currentTaskIndex];
    if (!task) return null;

    if (task.type === "quiz" && !quizAnswered) {
      const options = task.questions?.[0].options || [];
      return (
        <div className="flex flex-col space-y-2 mt-2">
          {options.map((opt, idx) => (
            <button
              key={idx}
              className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
              onClick={() => handleQuizAnswer(String.fromCharCode(65 + idx))}
            >
              {opt}
            </button>
          ))}
        </div>
      );
    }

    if (task.type === "choice" && !selectedOffice) {
      return (
        <div className="flex space-x-2 mt-2">
          {["President", "Senate", "House"].map((office) => (
            <button
              key={office}
              className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
              onClick={() => handleOfficeSelect(office.toLowerCase())}
            >
              {office}
            </button>
          ))}
        </div>
      );
    }

    return null;
  };

  return (
    <div className="flex flex-col h-full p-4 space-y-3 bg-gray-50 rounded-xl shadow-inner">
      <div className="flex-1 overflow-y-auto space-y-2">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`p-3 rounded-lg whitespace-pre-line ${
              msg.startsWith("👤") ? "bg-blue-100 text-blue-800 self-end" : "bg-white text-gray-900"
            }`}
          >
            {msg}
          </div>
        ))}
      </div>

      <div className="flex space-x-2 mt-2">
        <button
          onClick={handleStart}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Start
        </button>
      </div>

      {renderTaskOptions()}
    </div>
  );
};

export default ChatSimulator;
