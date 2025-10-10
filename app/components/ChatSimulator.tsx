// ./app/components/ChatSimulator.tsx
"use client";

import React, { useState } from "react";
import { speak } from "../utils/audioUtils";
import { allModules } from "@/app/data/allModules";
import { Module, Task } from "@/app/ai/types";

interface CandidateState {
  office?: string;
  cc: number;
  signatures: number;
  voterApproval: number;
}

const queueSpeak = (texts: string[]) => {
  let delay = 0;
  for (const line of texts) {
    setTimeout(() => speak(line), delay);
    const words = line.split(" ").length;
    const isOption = /^[A-D]\)/.test(line.trim());
    delay += isOption ? words * 400 : words * 250;
  }
};

const ChatSimulator: React.FC = () => {
  const [messages, setMessages] = useState<string[]>([
    "Welcome to the Federal Candidate Simulator!",
    "Click 'Start' when ready.",
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [candidateState, setCandidateState] = useState<CandidateState>({
    cc: 0,
    signatures: 0,
    voterApproval: 0,
  });
  const [currentModule, setCurrentModule] = useState<Module>(() => allModules[0]);
  const [quizAnswered, setQuizAnswered] = useState(false);
  const [taskStarted, setTaskStarted] = useState(false);

  // ---------------------- Start module ----------------------
  const startModule = () => {
    const firstTask = currentModule.tasks[0];
    const readingText = `${firstTask.prompt}\n\n${currentModule.readingSummary.join(
      "\n"
    )}`;

    setMessages((prev) => [
      ...prev,
      "🎬 Starting module...",
      readingText,
      "✅ Click 'Done' when finished reading.",
    ]);
    queueSpeak([readingText]);
    setTaskStarted(true);
  };

  // ---------------------- Handle quiz answer ----------------------
  const handleQuizAnswer = (letter: string) => {
    const quizTask = currentModule.tasks.find((t) => t.type === "quiz");
    if (!quizTask || !quizTask.questions?.length) return;

    const q = quizTask.questions[0];
    const correctLetter = q.correct[0][0].toUpperCase();
    const userLetter = letter.toUpperCase();

    if (userLetter === correctLetter) {
      setMessages((prev) => [...prev, `✅ Correct! You earned +5 CC.`]);
      queueSpeak(["Correct! You earned five Candidate Coins."]);
      setCandidateState((prev) => ({ ...prev, cc: prev.cc + 5 }));
    } else {
      setMessages((prev) => [
        ...prev,
        `❌ Incorrect. Correct answer: ${q.correct[0]}`,
      ]);
      queueSpeak([`Incorrect. The correct answer was ${q.correct[0]}.`]);
    }

    setQuizAnswered(true);
  };

  // ---------------------- Handle office selection ----------------------
  const handleOfficeSelection = (office: string) => {
    setSelectedOffice(office.toLowerCase());
    setCandidateState((prev) => ({ ...prev, office: office.toLowerCase() }));
    setMessages((prev) => [
      ...prev,
      `✅ You selected: ${office}`,
      `🎉 ${currentModule.title} complete! Preparing next module...`,
    ]);
    queueSpeak([
      `You selected ${office}. ${currentModule.title} complete! Preparing next module...`,
    ]);

    // Load next module
    if (currentModule.nextModule) {
      setTimeout(() => {
        const nextMod = allModules.find(
          (m) => m.id === currentModule.nextModule?.id
        );
        if (!nextMod) {
          setMessages((prev) => [...prev, "⚠️ Next module not found."]);
          return;
        }

        setCurrentModule(nextMod);
        setQuizAnswered(false);
        setTaskStarted(false);
        setSelectedOffice(null);

        const nextIntro = [
          `📘 ${nextMod.title}: ${nextMod.description}`,
          ...nextMod.readingSummary,
          "✅ Click 'Start' to begin the next module.",
        ];
        setMessages((prev) => [...prev, ...nextIntro]);
        queueSpeak([`${nextMod.title}: ${nextMod.description}`]);
      }, 2000);
    }
  };

  // ---------------------- Input handlers ----------------------
  const [selectedOffice, setSelectedOffice] = useState<string | null>(null);

  const handleUserInput = () => {
    const userInput = input.trim();
    if (!userInput) return;
    setMessages((prev) => [...prev, `👤 ${userInput}`]);
    setInput("");

    if (!taskStarted && userInput.toLowerCase() === "start") {
      startModule();
      return;
    }

    if (taskStarted && userInput.toLowerCase() === "done") {
      const quizTask = currentModule.tasks.find((t) => t.type === "quiz");
      if (quizTask) {
        const q = quizTask.questions?.[0];
        if (q) {
          setMessages((prev) => [
            ...prev,
            `✅ Please answer the quiz: ${q.question}`,
          ]);
        }
      }
    }
  };

  // ---------------------- JSX ----------------------
  return (
    <div className="flex flex-col h-full p-4 space-y-3 bg-gray-50 rounded-xl shadow-inner">
      <div className="flex-1 overflow-y-auto space-y-2">
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

        {taskStarted && !quizAnswered && (
          <div className="flex flex-col space-y-2 mt-2">
            {currentModule.tasks
              .filter((t) => t.type === "quiz")
              .map((t) =>
                t.questions?.[0].options.map((opt, idx) => (
                  <button
                    key={idx}
                    onClick={() =>
                      handleQuizAnswer(String.fromCharCode(65 + idx))
                    }
                    className="px-3 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                  >
                    {String.fromCharCode(65 + idx)}) {opt}
                  </button>
                ))
              )}
          </div>
        )}

        {quizAnswered && !selectedOffice && (
          <div className="flex flex-col space-y-2 mt-2">
            <p>Choose your office (click a button):</p>
            <button
              onClick={() => handleOfficeSelection("President")}
              className="px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              President (75 CC + 2.5% approval)
            </button>
            <button
              onClick={() => handleOfficeSelection("Senate")}
              className="px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Senate (50 CC + 2.5% approval)
            </button>
            <button
              onClick={() => handleOfficeSelection("House")}
              className="px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              House (31 CC + 2.5% approval)
            </button>
          </div>
        )}
      </div>

      <div className="flex space-x-2">
        <input
          className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
          value={input}
          placeholder="Type 'start' or 'done'..."
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
