// ./app/components/ChatSimulator.tsx
"use client";

import React, { useState } from "react";
import { speak } from "../utils/audioUtils";
import module0 from "../data/modules/module0.json";

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
    "Type 'start' when ready."
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [candidateState, setCandidateState] = useState<CandidateState>({
    cc: 0,
    signatures: 0,
    voterApproval: 0,
  });
  const [quizAnswered, setQuizAnswered] = useState(false);
  const [officeSelected, setOfficeSelected] = useState(false);

  // ---------------------- INPUT HANDLER ----------------------
  const handleUserInput = () => {
    if (!input.trim()) return;
    const userMsg = `👤 ${input}`;
    setMessages(prev => [...prev, userMsg]);
    setIsLoading(true);

    const userInput = input.trim();
    setInput("");

    // Start simulation
    if (userInput.toLowerCase() === "start") {
  const firstTask = module0.tasks[0];
  const quizTask = module0.tasks[1];

  const readingText = `${firstTask.prompt}\n\n${module0.readingSummary.join("\n")}`;

  // ✅ Guard: ensure quizTask.questions exists and has at least one element
  if (!quizTask.questions || quizTask.questions.length === 0) {
    setMessages(prev => [...prev, "⚠️ Quiz data is missing."]);
    setIsLoading(false);
    return;
  }

  const quizQuestion = quizTask.questions[0];
  const options = quizQuestion.options.map(
    (opt, i) => `${String.fromCharCode(65 + i)}) ${opt}`
  ).join("  ");

  setMessages(prev => [
    ...prev,
    "🎬 Starting simulation...",
    readingText,
    `🧩 ${quizTask.prompt}`,
    options
  ]);

  queueSpeak([readingText, quizTask.prompt, ...quizQuestion.options]);
  setIsLoading(false);
  return;
}

    // Quiz response
    if (!quizAnswered) {
      const quizTask = module0.tasks[1];
      const q = quizTask.questions[0];
      const correctLetter = q.correct[0].trim().toUpperCase();
      const userLetter = userInput[0].toUpperCase();

      if (["A", "B", "C", "D"].includes(userLetter)) {
        if (userLetter === correctLetter) {
          setMessages(prev => [...prev, "✅ Correct! You earned +5 Candidate Coins."]);
          setCandidateState(prev => ({ ...prev, cc: prev.cc + 5 }));
          queueSpeak(["Correct! You earned five Candidate Coins."]);
        } else {
          setMessages(prev => [...prev, `❌ Incorrect. The correct answer was: ${q.options[correctLetter.charCodeAt(0) - 65]}`]);
          queueSpeak([`Incorrect. The correct answer was ${q.options[correctLetter.charCodeAt(0) - 65]}.`]);
        }
        setQuizAnswered(true);

        // Prompt for office selection
        setMessages(prev => [...prev, "Now, type your chosen office in the chat: President, Senate, or House."]);
        queueSpeak(["Now, type your chosen office in the chat: President, Senate, or House."]);
      } else {
        setMessages(prev => [...prev, "❌ Please answer with A, B, C, or D."]);
        queueSpeak(["Please answer with A, B, C, or D."]);
      }
      setIsLoading(false);
      return;
    }

    // Office selection
    if (quizAnswered && !officeSelected) {
      const inputLower = userInput.toLowerCase();
      if (["president", "senate", "house"].includes(inputLower)) {
        setCandidateState(prev => ({ ...prev, office: inputLower }));
        setOfficeSelected(true);
        setMessages(prev => [...prev, `✅ You selected: ${inputLower.toUpperCase()}`]);
        queueSpeak([`You selected ${inputLower}.`]);
        setMessages(prev => [...prev, "🎉 Module 0 complete! Preparing Module 1..."]);
        queueSpeak(["Module 0 complete! Preparing Module 1..."]);
      } else {
        setMessages(prev => [...prev, "Please type a valid office: President, Senate, or House."]);
        queueSpeak(["Please type a valid office: President, Senate, or House."]);
      }
      setIsLoading(false);
      return;
    }

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
