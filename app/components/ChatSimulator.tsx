"use client";

import { useState, useEffect } from "react";

// Minimal Quiz component
interface QuizProps {
  question: string;
  options: string[];
  correctAnswer: string;
  signatureValue?: number;
  onAnswer: (answer: string) => void;
}

export const Quiz: React.FC<QuizProps> = ({ question, options, onAnswer }) => (
  <div className="quiz-container">
    <p>{question}</p>
    {options.map((opt, idx) => (
      <button key={idx} onClick={() => onAnswer(opt)}>
        {opt}
      </button>
    ))}
  </div>
);

// Module type
interface Module {
  question: string;
  options: string[];
  correctAnswer: string;
  signatureValue?: number;
  scenarioText?: string;
  choices?: string[];
}

// ChatSimulator component
const ChatSimulator: React.FC = () => {
  const [chatHistory, setChatHistory] = useState<string[]>([]);
  const [currentModule, setCurrentModule] = useState<Module | null>(null);
  const [CC, setCC] = useState(50);
  const [signatures, setSignatures] = useState(0);
  const [voterApproval, setVoterApproval] = useState(0);
  const [moduleIndex, setModuleIndex] = useState(0);
  const [loading, setLoading] = useState(false);

  const MODULES_TEXT = [
    `### Module 0: Orientation
Welcome to the Candidate Simulator! Read carefully and prepare for your first quiz.`,
    `### Module 1
Next module content here...`,
    // Add more module text as needed
  ];

  const generateQuiz = async (moduleText: string): Promise<Module> => {
    setLoading(true);

    const prompt = `
      You are the Candidate Simulator AI. Generate a quiz from this module content.
      Provide question, multiple-choice options, correctAnswer, signatureValue.
      Module text:
      ${moduleText}
    `;

    const response = await fetch("/api/generateQuiz", {
      method: "POST",
      body: JSON.stringify({ prompt }),
    });

    const data = await response.json();
    setLoading(false);
    return data as Module;
  };

  useEffect(() => {
    const loadModule = async () => {
      if (moduleIndex >= MODULES_TEXT.length) return;
      const generated = await generateQuiz(MODULES_TEXT[moduleIndex]);
      setCurrentModule(generated);
    };
    loadModule();
  }, [moduleIndex]);

  const handleAnswer = (answer: string) => {
    if (!currentModule) return;

    let newCC = CC;
    let newSignatures = signatures;

    if (answer === currentModule.correctAnswer) {
      newSignatures += currentModule.signatureValue || 20;
      newCC += 1;
      setChatHistory(prev => [
        ...prev,
        `AI: Correct! You earned ${currentModule.signatureValue || 20} signatures and +1 CC.`,
      ]);
    } else {
      newCC -= 1;
      newSignatures -= 50;
      setChatHistory(prev => [
        ...prev,
        `AI: Incorrect. Penalty applied: -1 CC, -50 signatures.`,
      ]);
    }

    setCC(newCC);
    setSignatures(newSignatures);
    setVoterApproval(newSignatures * 0.0001);
    setModuleIndex(moduleIndex + 1);
    setCurrentModule(null);
  };

  if (loading || !currentModule) return <div className="chat-bubble ai">Loading module...</div>;

  return (
    <div className="chat-container">
      {chatHistory.map((msg, idx) => (
        <div key={idx} className="chat-bubble user">{msg}</div>
      ))}

      {currentModule.question && currentModule.options ? (
        <Quiz
          question={currentModule.question}
          options={currentModule.options}
          correctAnswer={currentModule.correctAnswer}
          signatureValue={currentModule.signatureValue || 20}
          onAnswer={handleAnswer}
        />
      ) : currentModule.scenarioText && currentModule.choices ? (
        <div className="chat-scenario">
          <p>{currentModule.scenarioText}</p>
          {currentModule.choices.map((choice, idx) => (
            <button key={idx} onClick={() => handleAnswer(choice)}>
              {choice}
            </button>
          ))}
        </div>
      ) : (
        <div className="chat-bubble ai">Module content unavailable.</div>
      )}

      <div className="chat-status">
        <p>CC: {CC} | Signatures: {signatures} | Voter Approval: {(voterApproval * 100).toFixed(2)}%</p>
      </div>
    </div>
  );
};

export default ChatSimulator;
