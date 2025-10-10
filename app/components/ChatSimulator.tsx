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
  const [candidateState, setCandidateState] = useState<CandidateState>({
    cc: 0,
    signatures: 0,
    voterApproval: 0
  });
  const [selectedOffice, setSelectedOffice] = useState<string | null>(null);

  // ---------------------- RESPONSE HANDLER ----------------------
  const processResponse = (userInputRaw: string) => {
    const userInput = userInputRaw.trim();
    if (!userInput) return;

    const quizTask = module0.tasks.find(t => t.type === "quiz");
    const officeTask = module0.tasks.find(t => t.type === "choice");

    const quizAnswered = candidateState.cc !== 0; // 5 CC awarded after correct quiz

    // ---------------------- QUIZ ----------------------
    if (!quizAnswered && quizTask && quizTask.questions?.length) {
      const q = quizTask.questions[0];
      const options = q.options.map((opt, i) => `${String.fromCharCode(65 + i)}) ${opt}`).join("  ");
      const correctLetter = q.correct[0].trim().toUpperCase();
      const userLetter = userInput[0].toUpperCase();

      if (!["A","B","C","D"].includes(userLetter)) {
        setMessages(prev => [...prev, "❌ Please answer with A, B, C, or D."]);
        queueSpeak(["Please answer with A, B, C, or D."]);
        return;
      }

      if (userLetter === correctLetter) {
        setMessages(prev => [...prev, `✅ Correct! You earned +5 Candidate Coins.`]);
        queueSpeak(["Correct! You earned five Candidate Coins."]);
        setCandidateState(prev => ({ ...prev, cc: (prev.cc ?? 0) + 5 }));
      } else {
        setMessages(prev => [
          ...prev,
          `❌ Incorrect. The correct answer was: ${correctLetter}) ${q.options[correctLetter.charCodeAt(0)-65]}`
        ]);
        queueSpeak([
          `Incorrect. The correct answer was ${correctLetter}) ${q.options[correctLetter.charCodeAt(0)-65]}`
        ]);
      }

      // Prompt for office selection
      if (officeTask) {
        setMessages(prev => [
          ...prev,
          "Now, type your chosen office in the chat: President, Senate, or House."
        ]);
        queueSpeak(["Now, type your chosen office in the chat: President, Senate, or House."]);
      }
      return;
    }

    // ---------------------- OFFICE SELECTION ----------------------
    if (quizAnswered && !selectedOffice) {
      const inputLower = userInput.toLowerCase();
      if (!["president","senate","house"].includes(inputLower)) {
        setMessages(prev => [...prev, "❌ Please choose an office: President, Senate, or House."]);
        queueSpeak(["Please choose an office: President, Senate, or House."]);
        return;
      }

      setSelectedOffice(inputLower);
      setCandidateState(prev => ({ ...prev, office: inputLower }));
      setMessages(prev => [
        ...prev,
        `✅ You selected: ${inputLower.toUpperCase()}`,
        "🎉 Module 0 complete! Preparing Module 1..."
      ]);
      queueSpeak([`You selected ${inputLower}. Module 0 complete! Preparing Module 1...`]);
      // Placeholder: advance to Module 1 here
      return;
    }
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

      // Combine reading + quiz into one display for Module 0
      const firstTask = module0.tasks[0]; // read task
      const quizTask = module0.tasks.find(t => t.type === "quiz");

      if (firstTask) {
        const readingText = `${firstTask.prompt}\n\n${module0.readingSummary.join("\n")}`;
        const quizQuestionText = quizTask?.questions?.[0]?.question || "";
        const optionsText = quizTask?.questions?.[0]?.options
          ?.map((opt, i) => `${String.fromCharCode(65 + i)}) ${opt}`)
          .join("  ") || "";

        setMessages(prev => [
          ...prev,
          readingText,
          `✅ Please answer the following quiz first: ${quizQuestionText}`,
          optionsText
        ]);

        queueSpeak([readingText, quizQuestionText, ...quizTask?.questions?.[0]?.options || []]);
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
