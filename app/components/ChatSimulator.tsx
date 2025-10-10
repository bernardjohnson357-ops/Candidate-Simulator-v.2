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
    "Type 'start' when ready.",
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [candidateState, setCandidateState] = useState<CandidateState>({
    cc: 0,
    signatures: 0,
    voterApproval: 0,
  });
  const [selectedOffice, setSelectedOffice] = useState<string | null>(null);
  const [currentModule, setCurrentModule] = useState<Module>(allModules[0]);
  const [quizAnswered, setQuizAnswered] = useState(false);

  // ---------------------- QUIZ BUTTON HANDLER ----------------------
  const handleAnswerClick = (option: string, quiz: any) => {
    const correct = quiz.correct.includes(option[0].toUpperCase());

    setMessages((prev) => [
      ...prev,
      `✅ ${correct ? "Correct!" : `Incorrect. Correct answer: ${quiz.correct[0]}`}`,
    ]);

    queueSpeak([
      correct
        ? "Correct! You earned 5 Candidate Coins."
        : `Incorrect. The correct answer was ${quiz.correct[0]}`,
    ]);

    if (correct) {
      setCandidateState((prev) => ({ ...prev, cc: prev.cc + 5 }));
    }

    setQuizAnswered(true);

    // Prompt office selection if available
    const officeTask = currentModule.tasks.find((t) => t.type === "choice");
    if (officeTask) {
      setMessages((prev) => [
        ...prev,
        "✅ Quiz complete! Now, type your chosen office in the chat: President, Senate, or House.",
      ]);
      queueSpeak([
        "Quiz complete! Now, type your chosen office in the chat: President, Senate, or House.",
      ]);
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

    if (userInput.toLowerCase() === "start") {
      setMessages((prev) => [...prev, "🎬 Starting simulation..."]);
      speak("Starting simulation...");

      const firstTask = currentModule.tasks[0];
      if (firstTask) {
        const readingText = `${firstTask.prompt}\n\n${currentModule.readingSummary.join(
          "\n"
        )}`;

        setMessages((prev) => [
          ...prev,
          readingText,
          `✅ Type 'done' when you have finished reading.`,
        ]);
        queueSpeak([readingText]);
      }

      setIsLoading(false);
      return;
    }

    if (userInput.toLowerCase() === "done") {
      const quizTask = currentModule.tasks.find((t) => t.type === "quiz");
      if (quizTask && quizTask.questions?.length) {
        const quiz = quizTask.questions[0];
        setMessages((prev) => [
          ...prev,
          `✅ Please answer the following quiz: ${quiz.question}`,
        ]);
      }
      setIsLoading(false);
      return;
    }

    // ---------------------- OFFICE SELECTION ----------------------
    if (quizAnswered && !selectedOffice) {
      // ---------------------- OFFICE BUTTON HANDLER ----------------------
const handleOfficeClick = (office: string) => {
  setSelectedOffice(office);
  setCandidateState((prev) => ({ ...prev, office }));
  setMessages((prev) => [
    ...prev,
    `✅ You selected: ${office.toUpperCase()}`,
    `🎉 ${currentModule.title} complete! Preparing next module...`,
  ]);
  queueSpeak([
    `You selected ${office}. ${currentModule.title} complete! Preparing next module.`,
  ]);

  // Load next module after 3 seconds
  setTimeout(() => {
    if (currentModule.nextModule) {
      const nextMod = allModules.find((m) => m.id === currentModule.nextModule?.id);
      if (!nextMod) {
        setMessages((prev) => [...prev, "⚠️ Next module not found."]);
        return;
      }

      setCurrentModule(nextMod);
      setQuizAnswered(false);
      setSelectedOffice(null);

      setMessages((prev) => [
        ...prev,
        `📘 ${nextMod.title}: ${nextMod.description}`,
        ...nextMod.readingSummary,
        `✅ Type 'start' to begin the next module.`,
      ]);
      queueSpeak([`${nextMod.title}: ${nextMod.description}`, "Type start to begin the next module."]);
    }
  }, 3000);
};

// ---------------------- RENDER OFFICE BUTTONS ----------------------
const renderOfficeButtons = () => {
  const officeTask = currentModule.tasks.find((t) => t.type === "choice");
  if (!officeTask || quizAnswered === false || selectedOffice) return null;

  const options = ["President", "Senate", "House"];
  return (
    <div className="mt-2 flex space-x-2">
      {options.map((office) => (
        <button
          key={office}
          className="px-3 py-2 bg-green-100 hover:bg-green-200 rounded"
          onClick={() => handleOfficeClick(office.toLowerCase())}
        >
          {office}
        </button>
      ))}
    </div>
  );
};

  // ---------------------- UI ----------------------
  const renderQuizButtons = () => {
    const quizTask = currentModule.tasks.find((t) => t.type === "quiz");
    if (!quizTask || !quizTask.questions?.length || quizAnswered) return null;
    const quiz = quizTask.questions[0];

    return (
      <div className="mt-2 flex flex-col space-y-2">
        {quiz.options.map((opt, idx) => (
          <button
            key={idx}
            className="px-3 py-2 bg-blue-100 hover:bg-blue-200 rounded"
            onClick={() => handleAnswerClick(opt, quiz)}
          >
            {opt}
          </button>
        ))}
      </div>
    );
  };

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
        {renderQuizButtons()}
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
