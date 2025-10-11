// ./app/components/ChatSimulator.tsx
"use client";

import React, { useState } from "react";
import { Module, CandidateState, Task, TaskType, QuizQuestion } from "@/app/ai/types";
import { allModules } from "@/app/data/allModules";
import { speak, queueSpeak, processTask } from "@/app/ai/aiLoop";

const ChatSimulator: React.FC = () => {
  const [messages, setMessages] = useState<string[]>([
    "Welcome to the Federal Candidate Simulator!",
    "Click 'Start' when ready.",
  ]);
  const [currentModule, setCurrentModule] = useState<Module>(allModules[0]);
  const [candidateState, setCandidateState] = useState<CandidateState>({
    cc: 0,
    signatures: 0,
    voterApproval: 0,
  });
  const [quizAnswered, setQuizAnswered] = useState(false);
  const [selectedOffice, setSelectedOffice] = useState<string | null>(null);

  // ---------- DISPLAY MESSAGES ----------
  const addMessage = (text: string) => {
    setMessages((prev) => [...prev, text]);
    queueSpeak([text]);
  };

  // ---------- HANDLE START ----------
  const startModule = () => {
    const firstTask = currentModule.tasks[0];
    if (!firstTask) return;

    addMessage(`🎬 Starting module: ${currentModule.title}`);
    addMessage(firstTask.prompt);

    if (firstTask.type === "quiz" && firstTask.questions?.length) {
      displayQuiz(firstTask.questions[0]);
    }
  };

  // ---------- DISPLAY QUIZ ----------
  const displayQuiz = (quiz: QuizQuestion) => {
    const optionsText = quiz.options
      .map((opt, idx) => `${String.fromCharCode(65 + idx)}) ${opt}`)
      .join("  ");
    addMessage(`🧩 ${quiz.question}`);
    addMessage(optionsText);
  };

  // ---------- HANDLE USER INPUT ----------
  const handleUserInput = async (userInputRaw: string) => {
    const input = userInputRaw.trim();
    if (!input) return;

    addMessage(`👤 ${input}`);

    const task = currentModule.tasks[0]; // only first task for simplicity

    // ---------- QUIZ ----------
    if (task.type === "quiz" && !quizAnswered && task.questions?.length) {
      const quiz = task.questions[0];
      const userLetter = input[0].toUpperCase();
      const correctLetter = Array.isArray(quiz.correct)
        ? quiz.correct[0][0].toUpperCase()
        : quiz.correct[0].toUpperCase();

      if (userLetter === correctLetter) {
        addMessage(`✅ Correct! You earned +5 Candidate Coins`);
        setCandidateState((prev) => ({
          ...prev,
          cc: prev.cc + 5,
          signatures: prev.signatures + 5,
        }));
      } else {
        addMessage(`❌ Incorrect. The correct answer was: ${quiz.correct}`);
      }
      setQuizAnswered(true);

      addMessage(
        "✅ Quiz complete! Now, select your office: President (75 CC + 2.5% approval), Senate (50 CC + 2.5%), House (31 CC + 2.5%)."
      );
      return;
    }

    // ---------- OFFICE SELECTION ----------
    if (quizAnswered && !selectedOffice) {
      const choice = input.toLowerCase();
      if (!["president", "senate", "house"].includes(choice)) {
        addMessage("❌ Please select a valid office: President, Senate, or House");
        return;
      }

      setSelectedOffice(choice);
      setCandidateState((prev) => ({ ...prev, office: choice }));
      addMessage(`✅ You selected: ${choice.toUpperCase()}`);
      addMessage(`🎉 ${currentModule.title} complete! Preparing next module...`);

      // ---------- NEXT MODULE ----------
      if (currentModule.nextModule) {
        const next = allModules.find((m) => m.id === currentModule.nextModule?.id);
        if (next) {
          setTimeout(() => {
            setCurrentModule(next);
            setQuizAnswered(false);
            setSelectedOffice(null);
            addMessage(`📘 ${next.title}: ${next.description}`);
            addMessage("✅ Click 'Start' to begin the next module.");
          }, 1500);
        } else {
          addMessage("⚠️ Next module not found.");
        }
      }

      return;
    }
  };

  // ---------- INPUT BOX ----------
  const [input, setInput] = useState("");
  const handleSend = () => {
    if (!input.trim()) return;
    handleUserInput(input);
    setInput("");
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
      </div>

      <div className="flex space-x-2 mt-2">
        <input
          className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
          value={input}
          placeholder="Type your response..."
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button
          onClick={handleSend}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Send
        </button>
        {!quizAnswered && currentModule.tasks[0]?.type === "quiz" && (
          <button
            onClick={startModule}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            Start
          </button>
        )}
      </div>
    </div>
  );
};

export default ChatSimulator;
