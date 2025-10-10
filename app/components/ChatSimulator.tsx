// ./app/components/ChatSimulator.tsx
"use client";

import React, { useState } from "react";
import { speak } from "../utils/audioUtils";
import { allModules } from "@/app/data/allModules";
import { Module, Task, QuizQuestion } from "@/app/ai/types";

interface CandidateState {
  office?: string;
  cc: number;
  signatures: number;
  voterApproval: number;
}

const ChatSimulator: React.FC = () => {
  const [messages, setMessages] = useState<string[]>([
    "Welcome to the Federal Candidate Simulator!",
    "Click 'Start' when ready.",
  ]);
  const [candidateState, setCandidateState] = useState<CandidateState>({
    cc: 0,
    signatures: 0,
    voterApproval: 0,
  });
  const [currentModule, setCurrentModule] = useState<Module>(() => allModules[0]);
  const [currentTaskIndex, setCurrentTaskIndex] = useState(0);
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [taskStarted, setTaskStarted] = useState(false);

  const currentTask = currentModule.tasks[currentTaskIndex];
  const currentQuiz = currentTask?.questions?.[currentQuizIndex];

  const queueSpeak = (texts: string[]) => {
    let delay = 0;
    for (const line of texts) {
      setTimeout(() => speak(line), delay);
      const words = line.split(" ").length;
      const isOption = /^[A-D]\)/.test(line.trim());
      delay += isOption ? words * 400 : words * 250;
    }
  };

  const startModule = () => {
    if (!currentTask) return;

    const readingText =
      currentTask.prompt + "\n\n" + currentModule.readingSummary.join("\n");

    setMessages((prev) => [
      ...prev,
      "🎬 Starting module...",
      readingText,
      "✅ Click 'Done' when finished reading.",
    ]);
    queueSpeak([readingText]);
    setTaskStarted(true);
  };

  const handleQuizAnswer = (letter: string) => {
  if (!currentQuiz || !currentTask) return;

  const correctLetter = currentQuiz.correct[0][0].toUpperCase();
  const userLetter = letter.toUpperCase();

  let message = "";
  let ccChange = 0;
  let signaturesChange = 0;
  let approvalChange = 0;

  if (userLetter === correctLetter) {
    message = `✅ Correct! +5 CC, +10 signatures.`;
    ccChange = 5;
    signaturesChange = 10;
    approvalChange = 0.1; // 10 signatures = 0.1% approval
  } else {
    message = `❌ Incorrect. Correct answer: ${currentQuiz.correct[0]}. -2 CC`;
    ccChange = -2;
  }

  setMessages((prev) => [...prev, message]);
  queueSpeak([message]);

  // Update candidate state
  setCandidateState((prev) => ({
    ...prev,
    cc: prev.cc + ccChange,
    signatures: prev.signatures + signaturesChange,
    voterApproval: prev.voterApproval + approvalChange,
  }));

  // Move to next quiz question or next task
  if (currentQuizIndex + 1 < (currentTask.questions?.length || 0)) {
    setCurrentQuizIndex(currentQuizIndex + 1);
  } else {
    goToNextTask();
  }
};

  const goToNextTask = () => {
    setCurrentQuizIndex(0);
    if (currentTaskIndex + 1 < currentModule.tasks.length) {
      setCurrentTaskIndex(currentTaskIndex + 1);
    } else {
      // All tasks complete, prompt office selection
      setMessages((prev) => [
        ...prev,
        "✅ All tasks complete! Please select your office:",
      ]);
    }
  };

  const handleOfficeSelection = (office: string) => {
    setCandidateState((prev) => ({ ...prev, office: office.toLowerCase() }));
    setMessages((prev) => [
      ...prev,
      `✅ You selected: ${office}`,
      `🎉 ${currentModule.title} complete! Preparing next module...`,
    ]);
    queueSpeak([
      `You selected ${office}. ${currentModule.title} complete! Preparing next module...`,
    ]);

    if (currentModule.nextModule) {
      setTimeout(() => {
        const nextMod = allModules.find((m) => m.id === currentModule.nextModule?.id);
        if (!nextMod) {
          setMessages((prev) => [...prev, "⚠️ Next module not found."]);
          return;
        }

        setCurrentModule(nextMod);
        setCurrentTaskIndex(0);
        setCurrentQuizIndex(0);
        setTaskStarted(false);

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

        {taskStarted && currentTask?.type === "quiz" && currentQuiz && (
          <div className="flex flex-col space-y-2 mt-2">
            {currentQuiz.options.map((opt, idx) => (
              <button
                key={idx}
                onClick={() => handleQuizAnswer(String.fromCharCode(65 + idx))}
                className="px-3 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                {String.fromCharCode(65 + idx)}) {opt}
              </button>
            ))}
          </div>
        )}

        {currentTaskIndex >= currentModule.tasks.length && (
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
        <button
          onClick={startModule}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Start
        </button>
      </div>
    </div>
  );
};

export default ChatSimulator;
