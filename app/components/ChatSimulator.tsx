// ./app/components/ChatSimulator.tsx
"use client";

import React, { useState } from "react";
import { speak } from "../utils/audioUtils";
import { allModules } from "@/app/data/allModules";
import OpenAI from "openai";

// ---------- TYPES ----------
export type TaskType = "read" | "quiz" | "choice" | "decision" | "write" | "speak" | "upload";

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
  responsePlaceholder?: string;
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

// ---------- OPENAI CLIENT ----------
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// ---------- AUDIO QUEUE ----------
const queueSpeak = (texts: string[]) => {
  let delay = 0;
  for (const line of texts) {
    setTimeout(() => speak(line), delay);
    const words = line.split(" ").length;
    const isOption = /^[A-D]\)/.test(line.trim());
    delay += isOption ? words * 400 : words * 250;
  }
};

// ---------- CHAT SIMULATOR ----------
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
  const [currentModuleIndex, setCurrentModuleIndex] = useState(0);
  const [currentTaskIndex, setCurrentTaskIndex] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const currentModule = allModules[currentModuleIndex];
  const currentTask = currentModule.tasks[currentTaskIndex];
  const currentQuestion = currentTask?.questions?.[currentQuestionIndex];

  // ---------- OpenAI RESPONSE ----------
  const askAssistant = async (userInput: string) => {
    const moduleData = { ...currentModule, tasks: [currentTask] }; // only current task
    try {
      const response = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content:
              "You are the Federal Candidate Simulator assistant. Evaluate quiz answers, give guidance, and manage module progression.",
          },
          {
            role: "user",
            content: JSON.stringify({ module: moduleData, userInput }),
          },
        ],
      });

      return response.choices[0].message?.content || "";
    } catch (err) {
      console.error("OpenAI request failed:", err);
      return "⚠️ Error processing your answer. Try again.";
    }
  };

  // ---------- USER INPUT HANDLER ----------
  const handleUserInput = async () => {
    if (!input.trim()) return;
    const userMsg = `👤 ${input}`;
    setMessages((prev) => [...prev, userMsg]);
    setIsLoading(true);

    const userInput = input.trim();
    setInput("");

    // ---------- START MODULE ----------
    if (userInput.toLowerCase() === "start") {
      setMessages((prev) => [
        ...prev,
        "🎬 Starting module...",
        `${currentTask.prompt}\n\n${currentModule.readingSummary.join("\n")}`,
        "✅ Type 'done' when you have finished reading.",
      ]);
      queueSpeak([`${currentTask.prompt}`, ...currentModule.readingSummary]);
      setIsLoading(false);
      return;
    }

    // ---------- DONE READING ----------
    if (userInput.toLowerCase() === "done") {
      if (currentTask.type === "quiz" && currentTask.questions?.length) {
        const q = currentTask.questions[currentQuestionIndex];
        const optionsText = q.options
          .map((opt, i) => `${String.fromCharCode(65 + i)}) ${opt}`)
          .join("  ");

        setMessages((prev) => [
          ...prev,
          `🧩 Quiz: ${q.question}`,
          optionsText,
        ]);
        queueSpeak([q.question, ...q.options]);
      }
      setIsLoading(false);
      return;
    }

    // ---------- QUIZ OR OTHER TASK ----------
    if (currentTask.type === "quiz") {
      const assistantReply = await askAssistant(userInput);
      setMessages((prev) => [...prev, assistantReply]);

      // Move to next question or task
      if (currentQuestionIndex + 1 < currentTask.questions!.length) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else if (currentTaskIndex + 1 < currentModule.tasks.length) {
        setCurrentTaskIndex(currentTaskIndex + 1);
        setCurrentQuestionIndex(0);
      } else if (currentModuleIndex + 1 < allModules.length) {
        // Move to next module
        setCurrentModuleIndex(currentModuleIndex + 1);
        setCurrentTaskIndex(0);
        setCurrentQuestionIndex(0);

        const nextMod = allModules[currentModuleIndex + 1];
        const nextIntro = [
          `📘 ${nextMod.title}: ${nextMod.description}`,
          ...nextMod.readingSummary,
          "✅ Click 'Start' to begin the next module.",
        ];
        setMessages((prev) => [...prev, ...nextIntro]);
        queueSpeak([`${nextMod.title}: ${nextMod.description}`]);
      }
    } else {
      // Other task types (choice, decision, write)
      const assistantReply = await askAssistant(userInput);
      setMessages((prev) => [...prev, assistantReply]);
    }

    setIsLoading(false);
  };

  // ---------- RENDER ----------
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
