// ./app/components/ChatSimulator.tsx
// ./app/components/ChatSimulator.tsx
"use client";

import React, { useState } from "react";
import { speak } from "../utils/audioUtils";
import { allModules } from "@/app/data/allModules";

interface CandidateState {
  office?: string;
  cc: number;
  signatures: number;
  voterApproval: number;
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

// ---------- Audio queue ----------
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
    cc: 50,
    signatures: 0,
    voterApproval: 0,
  });
  const [selectedOffice, setSelectedOffice] = useState<string | null>(null);
  const [currentModule, setCurrentModule] = useState<Module>(allModules[0]);
  const [currentTaskIndex, setCurrentTaskIndex] = useState(0);
  const [quizAnswered, setQuizAnswered] = useState(false);

  // ---------------------- RESPONSE HANDLER ----------------------
  const processResponse = async (userInputRaw: string) => {
    const userInput = userInputRaw.trim();
    if (!userInput) return;

    const currentTask = currentModule.tasks[currentTaskIndex];

    if (!currentTask) return;

    // ---------------------- QUIZ ----------------------
    if (currentTask.type === "quiz" && !quizAnswered && currentTask.questions?.length) {
      const q = currentTask.questions[0];
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
        setCandidateState((prev) => ({ ...prev, cc: prev.cc + 5 }));
      } else {
        setMessages((prev) => [...prev, `❌ Incorrect. The correct answer was: ${q.correct[0]}`]);
        queueSpeak([`Incorrect. The correct answer was ${q.correct[0]}`]);
      }

      setQuizAnswered(true);
      setCurrentTaskIndex((prev) => prev + 1);

      // Prompt next step if available
      const nextTask = currentModule.tasks[currentTaskIndex + 1];
      if (nextTask?.type === "choice") {
        setMessages((prev) => [...prev, "✅ Quiz complete! Now, choose your office: President, Senate, or House."]);
        queueSpeak(["Quiz complete! Now, choose your office: President, Senate, or House."]);
      }

      return;
    }

    // ---------------------- OFFICE SELECTION ----------------------
    if (currentTask.type === "choice" && !selectedOffice) {
      const inputLower = userInput.toLowerCase();
      if (!["president", "senate", "house"].includes(inputLower)) {
        setMessages((prev) => [...prev, "❌ Please choose an office: President, Senate, or House."]);
        queueSpeak(["Please choose an office: President, Senate, or House."]);
        return;
      }

      setSelectedOffice(inputLower);
      setCandidateState((prev) => ({ ...prev, office: inputLower }));
      setMessages((prev) => [
        ...prev,
        `✅ You selected: ${inputLower.toUpperCase()}`,
        `🎉 ${currentModule.title} complete! Preparing next module...`,
      ]);
      queueSpeak([`${inputLower} selected. ${currentModule.title} complete! Preparing next module...`]);

      // Move to next module after delay
      if (currentModule.nextModule) {
        setTimeout(() => {
          const nextMod = allModules.find((m) => m.id === currentModule.nextModule?.id);
          if (!nextMod) {
            setMessages((prev) => [...prev, "⚠️ Next module not found."]);
            return;
          }

          setCurrentModule(nextMod);
          setCurrentTaskIndex(0);
          setQuizAnswered(false);
          setSelectedOffice(null);

          const nextIntro = [
            `📘 ${nextMod.title}: ${nextMod.description}`,
            ...nextMod.readingSummary,
            `✅ Click 'Start' to begin the next module.`,
          ];

          setMessages((prev) => [...prev, ...nextIntro]);
          queueSpeak([`${nextMod.title}: ${nextMod.description}`, "Click Start to begin the next module."]);
        }, 3000);
      }

      return;
    }

    // ---------------------- READ TASK ----------------------
    if (currentTask.type === "read") {
      setMessages((prev) => [...prev, `✅ Task complete: ${currentTask.prompt}`]);
      setCurrentTaskIndex((prev) => prev + 1);
      return;
    }
  };

  // ---------------------- INPUT HANDLER ----------------------
  const handleUserInput = () => {
    if (!input.trim()) return;
    const userMsg = `👤 ${input}`;
    setMessages((prev) => [...prev, userMsg]);
    setIsLoading(true);

    const userInput = input.trim();
    setInput("");

    const currentTask = currentModule.tasks[currentTaskIndex];

    if (userInput.toLowerCase() === "start" && currentTask) {
      setMessages((prev) => [...prev, "🎬 Starting module..."]);
      speak("Starting module...");

      if (currentTask.type === "read") {
        const readingText = `${currentTask.prompt}\n\n${currentModule.readingSummary.join("\n")}`;
        setMessages((prev) => [...prev, readingText, `✅ Type 'done' when finished reading.`]);
        queueSpeak([readingText]);
      }

      setIsLoading(false);
      return;
    }

    if (userInput.toLowerCase() === "done") {
      if (currentTask?.type === "read") {
        processResponse(userInput);
      }
      setIsLoading(false);
      return;
    }

    processResponse(userInput);
    setIsLoading(false);
  };

  // ---------------------- UI ----------------------
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
