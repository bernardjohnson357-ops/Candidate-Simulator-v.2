// ./app/components/ChatSimulator.tsx
"use client";

import React, { useState } from "react";
import { speak } from "../utils/audioUtils";
import module0 from "../data/modules/module0.json";
import module1 from "../data/modules/module1.json";

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
  const modules = [module0, module1];
  const [currentModuleIndex, setCurrentModuleIndex] = useState(0);
  const currentModule = modules[currentModuleIndex];

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

  const [readingDone, setReadingDone] = useState(false);
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [selectedOffice, setSelectedOffice] = useState<string | null>(null);

  const currentQuiz = currentModule.tasks.find(t => t.type === "quiz");

  // ---------------------- RESPONSE HANDLER ----------------------
  const processResponse = (userInputRaw: string) => {
    const userInput = userInputRaw.trim();

    if (!userInput) return;

    // ---------------------- READING ----------------------
    if (!readingDone) {
      if (userInput.toLowerCase() === "done") {
        setReadingDone(true);

        if (currentQuiz) {
          const firstQuestion = currentQuiz.questions?.[0];
          if (firstQuestion) {
            const optionsText = firstQuestion.options
              .map((opt, i) => `${String.fromCharCode(65 + i)}) ${opt}`)
              .join("  ");
            setMessages(prev => [
              ...prev,
              `✅ Please answer the following quiz: ${firstQuestion.question}`,
              optionsText
            ]);
            queueSpeak([firstQuestion.question, ...firstQuestion.options]);
          }
        }
      } else {
        setMessages(prev => [
          ...prev,
          "❌ Type 'done' when you have finished reading."
        ]);
        queueSpeak(["Type 'done' when you have finished reading."]);
      }
      return;
    }

    // ---------------------- QUIZ ----------------------
    if (readingDone && currentQuiz && currentQuiz.questions) {
      const question = currentQuiz.questions[currentQuizIndex];
      const optionsText = question.options
        .map((opt, i) => `${String.fromCharCode(65 + i)}) ${opt}`)
        .join("  ");

      const userLetter = userInput[0].toUpperCase();
      const correctLetter = question.correct[0][0].toUpperCase();

      if (!["A","B","C","D"].includes(userLetter)) {
        setMessages(prev => [...prev, "❌ Please answer with A, B, C, or D."]);
        queueSpeak(["Please answer with A, B, C, or D."]);
        return;
      }

      if (userLetter === correctLetter) {
        setMessages(prev => [...prev, `✅ Correct!`]);
        queueSpeak(["Correct!"]);
        // Example: Module 1 gives +20 signatures per correct answer
        setCandidateState(prev => ({
          ...prev,
          signatures: prev.signatures + 20
        }));
      } else {
        setMessages(prev => [
          ...prev,
          `❌ Incorrect. Correct answer: ${correctLetter}) ${question.options[correctLetter.charCodeAt(0)-65]}`
        ]);
        queueSpeak([
          `Incorrect. Correct answer: ${correctLetter}) ${question.options[correctLetter.charCodeAt(0)-65]}`
        ]);
        setCandidateState(prev => ({
          ...prev,
          cc: Math.max(0, prev.cc - 1)
        }));
      }

      // Advance to next quiz question or finish
      if (currentQuizIndex + 1 < currentQuiz.questions.length) {
        const nextIndex = currentQuizIndex + 1;
        setCurrentQuizIndex(nextIndex);
        const nextQ = currentQuiz.questions[nextIndex];
        const nextOptions = nextQ.options
          .map((opt, i) => `${String.fromCharCode(65 + i)}) ${opt}`)
          .join("  ");
        setMessages(prev => [
          ...prev,
          `✅ Next question: ${nextQ.question}`,
          nextOptions
        ]);
        queueSpeak([nextQ.question, ...nextQ.options]);
      } else {
        // All questions answered, prompt office selection if exists
        const officeTask = currentModule.tasks.find(t => t.type === "choice");
        if (officeTask) {
          setMessages(prev => [
            ...prev,
            "✅ Quiz complete! Now, type your chosen office in the chat: President, Senate, or House."
          ]);
          queueSpeak([
            "Quiz complete! Now, type your chosen office in the chat: President, Senate, or House."
          ]);
        }
      }
      return;
    }

    // ---------------------- OFFICE SELECTION ----------------------
    if (!selectedOffice) {
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
        `🎉 Module ${currentModuleIndex} complete! Preparing Module ${currentModuleIndex + 1}...`
      ]);
      queueSpeak([`You selected ${inputLower}. Module complete! Preparing next module.`]);

      // Reset for next module
      setReadingDone(false);
      setCurrentQuizIndex(0);
      setSelectedOffice(null);

      // Advance to next module if exists
      if (currentModuleIndex + 1 < modules.length) {
        setCurrentModuleIndex(prev => prev + 1);
      }

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

      // Display reading content first
      const readTask = currentModule.tasks.find(t => t.type === "read");
      if (readTask) {
        const readingText = `${readTask.prompt}\n\n${currentModule.readingSummary.join("\n")}`;
        setMessages(prev => [...prev, readingText, "✅ Type 'done' when you have finished reading."]);
        queueSpeak([readingText]);
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
