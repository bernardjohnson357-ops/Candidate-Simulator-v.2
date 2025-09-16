"use client";

import { useState } from "react";

// --- Quiz Component ---
interface QuizProps {
  question: string;
  options: string[];
  correctAnswer: string;
  signatureValue?: number;
  onAnswer: (answer: string) => void;
}

const Quiz: React.FC<QuizProps> = ({
  question,
  options,
  onAnswer,
}) => (
  <div className="quiz-container">
    <p className="mb-4">{question}</p>
    <div className="flex flex-col gap-2">
      {options.map((opt, idx) => (
        <button
          key={idx}
          onClick={() => onAnswer(opt)}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          {opt}
        </button>
      ))}
    </div>
  </div>
);

// --- Module type ---
interface Module {
  question: string;
  options: string[];
  correctAnswer: string;
  signatureValue?: number;
  scenarioText?: string;
  choices?: string[];
}

// --- ChatSimulator ---
const ChatSimulator: React.FC = () => {
  const [chatHistory, setChatHistory] = useState<string[]>([]);
  const [currentModule, setCurrentModule] = useState<Module | null>(null);
  const [CC, setCC] = useState(50);
  const [signatures, setSignatures] = useState(0);
  const [voterApproval, setVoterApproval] = useState(0);
  const [moduleIndex, setModuleIndex] = useState(0);

  // Mock module text
  const MODULES_TEXT = [
    "Welcome to Candidate Simulator. Orientation module.",
    "Module 1: Filing requirements and ballot access.",
  ];

  // Mock quiz generator
  const generateQuiz = (moduleText: string): Module => {
    if (moduleIndex === 0) {
      return {
        question: "What is the purpose of this simulator?",
        options: ["Entertainment", "Campaign training", "Cooking lessons"],
        correctAnswer: "Campaign training",
        signatureValue: 50,
      };
    }
    return {
      question: "What is required to file as an independent candidate?",
      options: [
        "Pay the fee or gather enough signatures",
        "Only announce on social media",
        "Nothing, anyone can run",
      ],
      correctAnswer: "Pay the fee or gather enough signatures",
      signatureValue: 100,
    };
  };

  // Load module quiz
  if (!currentModule && moduleIndex < MODULES_TEXT.length) {
    setCurrentModule(generateQuiz(MODULES_TEXT[moduleIndex]));
  }

  const handleAnswer = (answer: string) => {
    if (!currentModule) return;

    let newCC = CC;
    let newSignatures = signatures;

    if (answer === currentModule.correctAnswer) {
      newSignatures += currentModule.signatureValue || 20;
      newCC += 1;
      setChatHistory(prev => [
        ...prev,
        `✅ Correct! +${currentModule.signatureValue || 20} signatures, +1 CC`,
      ]);
    } else {
      newCC -= 1;
      newSignatures = Math.max(0, newSignatures - 50);
      setChatHistory(prev => [
        ...prev,
        `❌ Incorrect. Penalty: -1 CC, -50 signatures`,
      ]);
    }

    setCC(newCC);
    setSignatures(newSignatures);
    setVoterApproval(newSignatures * 0.0001);
    setModuleIndex(moduleIndex + 1);
    setCurrentModule(null);
  };

  if (moduleIndex >= MODULES_TEXT.length) {
    return <div className="chat-bubble ai">🎉 Simulation complete!</div>;
  }

  return (
    <div className="chat-container space-y-4">
      {chatHistory.map((msg, idx) => (
        <div key={idx} className="chat-bubble ai">
          {msg}
        </div>
      ))}

      {currentModule && (
        <Quiz
          question={currentModule.question}
          options={currentModule.options}
          correctAnswer={currentModule.correctAnswer}
          signatureValue={currentModule.signatureValue}
          onAnswer={handleAnswer}
        />
      )}

      <div className="chat-status mt-4 text-sm">
        <p>💰 CC: {CC}</p>
        <p>🖊️ Signatures: {signatures}</p>
        <p>📊 Voter Approval: {(voterApproval * 100).toFixed(2)}%</p>
      </div>
    </div>
  );
};

export default ChatSimulator;
