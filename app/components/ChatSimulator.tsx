// ./app/components/ChatSimulator.tsx
"use client";

import React, { useState } from "react";
import { speak } from "../utils/audioUtils";
import { allModules } from "@/app/data/allModules";

export type TaskType =
  | "read"
  | "quiz"
  | "choice"
  | "decision"
  | "write"
  | "upload"
  | "speak";

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correct: string[];
}

export interface Task {
  id: string;
  type: TaskType;
  prompt: string;
  questions?: QuizQuestion[];
}

export interface Module {
  id: string;
  title: string;
  active: boolean;
  description: string;
  readingSummary: string[];
  tasks: Task[];
  nextModule?: {
    id: string;
    title: string;
    description: string;
  };
}

export interface CandidateState {
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
  const [isLoading, setIsLoading] = useState(false);
  const [candidateState, setCandidateState] = useState<CandidateState>({
    cc: 0,
    signatures: 0,
    voterApproval: 0,
  });
  const [currentModule, setCurrentModule] = useState<Module>(
    allModules[0] as unknown as Module
  );
  const [quizAnswered, setQuizAnswered] = useState(false);
  const [showOfficeButtons, setShowOfficeButtons] = useState(false);
  const [currentQuiz, setCurrentQuiz] = useState<QuizQuestion | null>(null);

  const addMessage = (msg: string) => setMessages((prev) => [...prev, msg]);

  // ---------- START MODULE ----------
  const startModule = () => {
    const firstTask = currentModule.tasks[0];
    if (!firstTask) return;

    const readingText = `${firstTask.prompt}\n\n${currentModule.readingSummary.join(
      "\n"
    )}`;
    addMessage("🎬 Starting module...");
    addMessage(readingText);
    queueSpeak([readingText]);

    // Show quiz if present
    const quizTask = currentModule.tasks.find((t) => t.type === "quiz");
    if (quizTask && quizTask.questions?.length) {
      setCurrentQuiz(quizTask.questions[0]);
    }
  };

  // ---------- HANDLE QUIZ ----------
  const handleQuizAnswer = (letter: string) => {
    if (!currentQuiz) return;
    const correctLetter = currentQuiz.correct[0][0].toUpperCase();
    const userLetter = letter.toUpperCase();

    if (userLetter === correctLetter) {
      addMessage(`✅ Correct! You earned +5 Candidate Coins.`);
      setCandidateState((prev) => ({ ...prev, cc: prev.cc + 5 }));
      queueSpeak(["Correct! You earned five Candidate Coins."]);
    } else {
      addMessage(`❌ Incorrect. Correct answer: ${currentQuiz.correct[0]}`);
      queueSpeak([`Incorrect. The correct answer was ${currentQuiz.correct[0]}`]);
    }

    setQuizAnswered(true);
    setShowOfficeButtons(true);
  };

  // ---------- HANDLE OFFICE SELECTION ----------
  const handleOfficeSelect = (office: string) => {
    setCandidateState((prev) => ({ ...prev, office }));
    addMessage(`✅ You selected: ${office.toUpperCase()}`);
    addMessage(`🎉 ${currentModule.title} complete! Preparing next module...`);
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
          addMessage("⚠️ Next module not found in allModules.");
          return;
        }

        setCurrentModule(nextMod as unknown as Module);
        setQuizAnswered(false);
        setShowOfficeButtons(false);
        setCurrentQuiz(null);

        const nextIntro = [
          `📘 ${nextMod.title}: ${nextMod.description}`,
          ...nextMod.readingSummary,
          `✅ Click 'Start' to begin the next module.`,
        ];
        setMessages((prev) => [...prev, ...nextIntro]);
        queueSpeak([`${nextMod.title}: ${nextMod.description}`]);
      }, 1500);
    }
  };

  // ---------- UI ----------
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

        {currentQuiz && !quizAnswered && (
          <div className="mt-2 space-y-1">
            {currentQuiz.options.map((opt, i) => (
              <button
                key={i}
                className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                onClick={() =>
                  handleQuizAnswer(String.fromCharCode(65 + i))
                }
              >
                {String.fromCharCode(65 + i)}) {opt}
              </button>
            ))}
          </div>
        )}

        {showOfficeButtons && (
          <div className="mt-2 space-y-1">
            {[
              { label: "President", cc: 75, approval: 2.5 },
              { label: "Senate", cc: 50, approval: 2.5 },
              { label: "House", cc: 31, approval: 2.5 },
            ].map((office) => (
              <button
                key={office.label}
                className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
                onClick={() => handleOfficeSelect(office.label.toLowerCase())}
              >
                {office.label} ({office.cc} CC + {office.approval}% approval)
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="flex space-x-2 mt-2">
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          onClick={startModule}
        >
          Start
        </button>
      </div>
    </div>
  );
};

export default ChatSimulator;
