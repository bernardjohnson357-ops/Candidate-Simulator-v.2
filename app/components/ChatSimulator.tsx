// ./app/components/ChatSimulator.tsx
"use client";

import React, { useEffect, useState } from "react";
import { speak } from "../utils/audioUtils";
import { allModules } from "../app/data/allModules";
import { Module, Task } from "../app/ai/types";

// ---------- TYPES ----------
interface CandidateState {
  office?: string;
  cc?: number;
  signatures?: number;
  voterApproval?: number;
}

interface Task {
  id: string;
  type: "read" | "quiz" | "choice";
  prompt: string;
  questions?: {
    id: string;
    question: string;
    options: string[];
    correct: string[];
  }[];
}

interface Module {
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

// ---------- AUDIO QUEUE ----------
const queueSpeak = (lines: string[]) => {
  let delay = 0;
  for (const line of lines) {
    setTimeout(() => speak(line), delay);
    const words = line.split(" ").length;
    const isOption = /^[A-D]\)/.test(line.trim());
    delay += isOption ? words * 400 : words * 250;
  }
};

// ---------- MAIN COMPONENT ----------
const ChatSimulator: React.FC = () => {
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [candidateState, setCandidateState] = useState<CandidateState>({
    cc: 0,
    signatures: 0,
    voterApproval: 0,
  });
  const [selectedOffice, setSelectedOffice] = useState<string | null>(null);
  const [currentModule, setCurrentModule] = useState<Module>(() => allModules[0]);
  const [quizAnswered, setQuizAnswered] = useState(false);

  // ---------- AUTO-START MODULE 0 ----------
  useEffect(() => {
    const intro = [
      `🎬 ${currentModule.title}: ${currentModule.description}`,
      ...currentModule.readingSummary,
      `✅ Type 'done' when you have finished reading.`,
    ];
    setMessages(intro);
    queueSpeak(intro);
  }, []);

  // ---------- CORE RESPONSE HANDLER ----------
  const processResponse = async (userInputRaw: string) => {
    const userInput = userInputRaw.trim();
    if (!userInput) return;

    const quizTask = currentModule.tasks.find((t) => t.type === "quiz");
    const officeTask = currentModule.tasks.find((t) => t.type === "choice");

    // ---------- QUIZ ----------
    if (!quizAnswered && quizTask && quizTask.questions?.length) {
      const q = quizTask.questions[0];
      const correctLetter = q.correct[0][0].toUpperCase();
      const userLetter = userInput[0].toUpperCase();

      if (!["A", "B", "C", "D"].includes(userLetter)) {
        setMessages((prev) => [...prev, "❌ Please answer with A, B, C, or D."]);
        queueSpeak(["Please answer with A, B, C, or D."]);
        return;
      }

      if (userLetter === correctLetter) {
        setMessages((prev) => [...prev, `✅ Correct! You earned +5 Candidate Coins.`]);
        queueSpeak(["Correct! You earned five Candidate Coins."]);
        setCandidateState((prev) => ({ ...prev, cc: (prev.cc ?? 0) + 5 }));
      } else {
        setMessages((prev) => [
          ...prev,
          `❌ Incorrect. The correct answer was: ${q.correct[0]}`,
        ]);
        queueSpeak([`Incorrect. The correct answer was ${q.correct[0]}`]);
      }

      setQuizAnswered(true);

      // Prompt office selection if applicable
      if (officeTask) {
        setMessages((prev) => [
          ...prev,
          "✅ Quiz complete! Now, type your chosen office: President, Senate, or House.",
        ]);
        queueSpeak([
          "Quiz complete! Now, type your chosen office: President, Senate, or House.",
        ]);
      }

      return;
    }

    // ---------- OFFICE SELECTION ----------
    if (quizAnswered && !selectedOffice && officeTask) {
      const inputLower = userInput.toLowerCase();
      if (!["president", "senate", "house"].includes(inputLower)) {
        setMessages((prev) => [
          ...prev,
          "❌ Please choose: President, Senate, or House.",
        ]);
        queueSpeak(["Please choose an office: President, Senate, or House."]);
        return;
      }

      setSelectedOffice(inputLower);
      setCandidateState((prev) => ({ ...prev, office: inputLower }));

      const successMsg = [
        `✅ You selected: ${inputLower.toUpperCase()}`,
        `🎉 ${currentModule.title} complete! Preparing next module...`,
      ];
      setMessages((prev) => [...prev, ...successMsg]);
      queueSpeak(successMsg);

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

          const nextIntro = [
            `📘 ${nextMod.title}: ${nextMod.description}`,
            ...nextMod.readingSummary,
            `✅ Type 'done' when you have finished reading.`,
          ];
          setMessages((prev) => [...prev, ...nextIntro]);
          queueSpeak(nextIntro);
        }, 3000);
      }

      return;
    }
  };

  // ---------- USER INPUT ----------
  const handleUserInput = () => {
    if (!input.trim()) return;
    const userMsg = `👤 ${input}`;
    setMessages((prev) => [...prev, userMsg]);
    setIsLoading(true);

    const userInput = input.trim();
    setInput("");

    // Move to quiz
    if (userInput.toLowerCase() === "done") {
      const quizTask = currentModule.tasks.find((t) => t.type === "quiz");
      if (quizTask && quizTask.questions?.length) {
        const q = quizTask.questions[0];
        const optionsText = q.options
          .map((opt, i) => `${String.fromCharCode(65 + i)}) ${opt}`)
          .join("  ");

        setMessages((prev) => [
          ...prev,
          `🧩 ${q.question}`,
          optionsText,
          "Type A, B, C, or D to answer.",
        ]);
        queueSpeak([q.question, ...q.options]);
        setIsLoading(false);
        return;
      }
    }

    processResponse(userInput);
    setIsLoading(false);
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
        {isLoading && <div className="text-gray-400">Processing...</div>}
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
