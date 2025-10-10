// ./app/components/ChatSimulator.tsx
"use client";

import React, { useState } from "react";
import { speak } from "../utils/audioUtils";
import module0 from "../data/modules/module0.json";

interface CandidateState {
  office?: string;
  cc?: number;
  signatures?: number;
  voterApproval?: number;
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
    "Type 'start' when ready."
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [currentModuleIndex, setCurrentModuleIndex] = useState(0);
  const [currentTaskIndex, setCurrentTaskIndex] = useState(0);
  const [candidateState, setCandidateState] = useState<CandidateState>({
    cc: 0,
    signatures: 0,
    voterApproval: 0
  });
  const [selectedOffice, setSelectedOffice] = useState<string | null>(null);
  const [inQuiz, setInQuiz] = useState(false);

  const modules = [module0];
  const currentModule = modules[currentModuleIndex];
  const currentTask = currentModule?.tasks?.[currentTaskIndex];

  // ---------------------- TASK FLOW ----------------------
  const goToNextTask = () => {
    const nextTaskIndex = currentTaskIndex + 1;
    const moduleTasks = currentModule?.tasks || [];

    if (nextTaskIndex < moduleTasks.length) {
      setCurrentTaskIndex(nextTaskIndex);
      const nextTask = moduleTasks[nextTaskIndex];

      if (nextTask.type === "quiz" && Array.isArray(nextTask.questions) && nextTask.questions.length > 0) {
        const q = nextTask.questions[0];
        const options = q.options?.map((opt, i) => `${String.fromCharCode(65 + i)}) ${opt}`) || [];
        setMessages(prev => [...prev, `🧩 ${q.question}`, options.join("  ")]);
        queueSpeak([q.question, ...options]);
        setInQuiz(true);
      } else if (nextTask.type === "choice") {
        setMessages(prev => [...prev, nextTask.prompt]);
        queueSpeak([nextTask.prompt]);
      } else if (nextTask.type === "read") {
        setMessages(prev => [...prev, nextTask.prompt]);
        queueSpeak([nextTask.prompt]);
      }
    } else {
      setMessages(prev => [...prev, "🎉 You’ve completed this module! Moving to Module 1..."]);
      queueSpeak(["You’ve completed this module! Moving to Module 1."]);
      setInQuiz(false);
      // Placeholder for module transition
      // setCurrentModuleIndex(prev => prev + 1);
    }
  };

  // ---------------------- RESPONSE HANDLER ----------------------
  const processResponse = (userInput: string) => {
    const inputLower = userInput.trim().toLowerCase();

    // Step 1: Quiz
    if (inQuiz && currentTask?.type === "quiz") {
      const q = currentTask.questions?.[0];
      if (q && q.correct) {
        const correctRaw = Array.isArray(q.correct) ? q.correct[0] : q.correct;
        const correctLetter = (correctRaw || "").trim()[0]?.toUpperCase() || "";
        const userLetter = (inputLower || "").trim()[0]?.toUpperCase() || "";

        if (["A", "B", "C", "D"].includes(userLetter)) {
          if (userLetter === correctLetter) {
            setMessages(prev => [...prev, "✅ Correct! You earned +5 Candidate Coins."]);
            setCandidateState(prev => ({ ...prev, cc: (prev.cc ?? 0) + 5 }));
            queueSpeak(["Correct! You earned five Candidate Coins."]);
          } else {
            setMessages(prev => [...prev, `❌ Incorrect. The correct answer was: ${correctRaw}`]);
            queueSpeak([`Incorrect. The correct answer was ${correctRaw}.`]);
          }
        } else {
          setMessages(prev => [...prev, "❌ Please answer with A, B, C, or D."]);
          queueSpeak(["Please answer with A, B, C, or D."]);
          return;
        }
      }
      setInQuiz(false);
      goToNextTask();
      return;
    }

    // Step 2: Office selection
    if (!selectedOffice && currentTask?.type === "choice") {
      if (["president", "senate", "house"].includes(inputLower)) {
        setSelectedOffice(inputLower);
        setCandidateState(prev => ({ ...prev, office: inputLower }));
        setMessages(prev => [
          ...prev,
          `✅ You selected: ${inputLower.toUpperCase()}`,
          "🎬 Your campaign journey begins!"
        ]);
        queueSpeak([`You selected ${inputLower}. Your campaign journey begins!`]);
        goToNextTask();
        return;
      } else {
        setMessages(prev => [
          ...prev,
          "❌ Please choose an office: President, Senate, or House."
        ]);
        queueSpeak(["Please choose an office: President, Senate, or House."]);
        return;
      }
    }

    // Step 3: Post-module
    setMessages(prev => [...prev, "⚠️ Input not recognized."]);
  };

  // ---------------------- INPUT HANDLER ----------------------
  const handleUserInput = () => {
    if (!input.trim()) return;
    const userMsg = `👤 ${input}`;
    setMessages(prev => [...prev, userMsg]);
    setIsLoading(true);

    const userInput = input.trim();
    setInput("");

    if (userInput.toLowerCase() === "start") {
      setMessages(prev => [...prev, "🎬 Starting simulation..."]);
      speak("Starting simulation...");
      const firstTask = currentModule?.tasks?.[0];

      if (firstTask?.type === "read") {
        const summaryText = currentModule.readingSummary?.join(" ") || "";
        const readingText = `📘 ${firstTask.prompt}\n\n${summaryText}`;
        setMessages(prev => [...prev, readingText]);
        queueSpeak([firstTask.prompt, summaryText]);
        goToNextTask(); // automatically advance to quiz
      } else {
        setMessages(prev => [...prev, "⚠️ No valid starting task found."]);
      }

      setIsLoading(false);
      return;
    }

    processResponse(userInput);
    setIsLoading(false);
  };

  // ---------------------- UI ----------------------
  return (
    <div className="flex flex-col w-full max-w-2xl mx-auto p-4 bg-gray-50 rounded-2xl shadow-md">
      <div className="flex-1 overflow-y-auto space-y-2 mb-4">
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
        {isLoading && <div className="text-gray-500 italic">Processing...</div>}
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
