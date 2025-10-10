// ./app/components/ChatSimulator.tsx
"use client";

import React, { useState } from "react";
import { speak } from "../utils/audioUtils";
import { allModules } from "@/app/data/allModules";

interface CandidateState {
  office?: string;
  cc?: number;
  signatures?: number;
  voterApproval?: number;
}

interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correct: string[];
}

interface Task {
  id: string;
  type: "read" | "quiz" | "choice";
  prompt: string;
  questions?: QuizQuestion[];
  responsePlaceholder?: string;
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
  const [currentModule, setCurrentModule] = useState<Module>(() => allModules[0]);
  const [quizIndex, setQuizIndex] = useState<number>(0); // tracks current question index

  // ---------------------- RESPONSE HANDLER ----------------------
  const processResponse = (userInputRaw: string) => {
    const userInput = userInputRaw.trim();
    if (!userInput) return;

    const quizTask = currentModule.tasks.find((t) => t.type === "quiz");
    const officeTask = currentModule.tasks.find((t) => t.type === "choice");

    // ---------------------- QUIZ ----------------------
    if (quizTask && quizTask.questions && quizIndex < quizTask.questions.length) {
      const q = quizTask.questions[quizIndex];
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
        setMessages((prev) => [...prev, `❌ Incorrect. The correct answer was: ${q.correct[0]}`]);
        queueSpeak([`Incorrect. The correct answer was ${q.correct[0]}`]);
      }

      // Move to next question or office selection
      if (quizIndex + 1 < quizTask.questions.length) {
        setQuizIndex((prev) => prev + 1);
        const nextQ = quizTask.questions[quizIndex + 1];
        const optionsText = nextQ.options.map((opt, i) => `${String.fromCharCode(65 + i)}) ${opt}`).join("  ");
        setMessages((prev) => [...prev, `🧩 ${nextQ.question}`, optionsText]);
        queueSpeak([nextQ.question, ...nextQ.options]);
      } else if (officeTask) {
        setMessages((prev) => [...prev, "✅ Quiz complete! Now, type your chosen office: President, Senate, or House."]);
        queueSpeak(["Quiz complete! Now, type your chosen office: President, Senate, or House."]);
      }

      return;
    }

    // ---------------------- OFFICE SELECTION ----------------------
    if (officeTask && !selectedOffice) {
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
      queueSpeak([`You selected ${inputLower}. ${currentModule.title} complete! Preparing next module...`]);

      // Load next module after 3 seconds
      if (currentModule.nextModule) {
        setTimeout(() => {
          const nextMod = allModules.find((m) => m.id === currentModule.nextModule?.id);
          if (!nextMod) {
            setMessages((prev) => [...prev, "⚠️ Next module not found in allModules."]);
            return;
          }
          setCurrentModule(nextMod);
          setQuizIndex(0);
          setSelectedOffice(null);

          const nextIntro = [
            `📘 ${nextMod.title}: ${nextMod.description}`,
            ...nextMod.readingSummary,
            `✅ Type 'start' to begin the next module.`,
          ];
          setMessages((prev) => [...prev, ...nextIntro]);
          queueSpeak([`${nextMod.title}: ${nextMod.description}`, "Type start to begin the next module."]);
        }, 3000);
      }

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

    if (userInput.toLowerCase() === "start") {
      const firstTask = currentModule.tasks[0];
      if (firstTask) {
        const readingText = `${firstTask.prompt}\n\n${currentModule.readingSummary.join("\n")}`;
        setMessages((prev) => [...prev, "🎬 Starting simulation...", readingText, `✅ Type 'done' when finished reading.`]);
        queueSpeak([readingText]);
      }
      setIsLoading(false);
      return;
    }

    if (userInput.toLowerCase() === "done") {
      const quizTask = currentModule.tasks.find((t) => t.type === "quiz");
      if (quizTask && quizTask.questions?.length) {
        const q = quizTask.questions[0];
        const optionsText = q.options.map((opt, i) => `${String.fromCharCode(65 + i)}) ${opt}`).join("  ");
        setMessages((prev) => [...prev, `✅ Please answer the following quiz: ${q.question}`, optionsText]);
        queueSpeak([q.question, ...q.options]);
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
        <button onClick={handleUserInput} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatSimulator;
