// app/components/ChatSimulator.tsx
"use client";

import { useState, useEffect } from "react";
import { Quiz } from "./Quiz";

// Instead of importing Markdown, just fetch text from a local API or inline string
const ORIENTATION_TEXT = `### 🗳 Candidate Simulator Orientation
Welcome to the Candidate Simulator!`;

interface Module {
  question: string;
  options: string[];
  correctAnswer: string;
  signatureValue?: number;
  scenarioText?: string;
  choices?: string[];
}

const ChatSimulator = () => {
  const [chatHistory, setChatHistory] = useState<string[]>([]);
  const [currentModule, setCurrentModule] = useState<Module | null>(null);
  const [CC, setCC] = useState(50);
  const [signatures, setSignatures] = useState(0);
  const [voterApproval, setVoterApproval] = useState(0);
  const [moduleIndex, setModuleIndex] = useState(0);
  const [loading, setLoading] = useState(false);

  // AI generates quiz from text
  const generateQuiz = async (moduleText: string): Promise<Module> => {
    setLoading(true);

    const prompt = `
      You are the Candidate Simulator AI. Generate a quiz from the following module content.
      Provide:
        - question
        - options (multiple choice)
        - correctAnswer
        - signatureValue (optional)
        - scenarioText (optional)
        - choices (optional)
      Module content:
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
      const moduleText = moduleIndex === 0 ? ORIENTATION_TEXT : "Next module text here";
      const generated = await generateQuiz(moduleText);
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
        `AI [neutral]: Correct! You earned ${currentModule.signatureValue || 20} signatures and +1 CC.`,
      ]);
    } else {
      newCC -= 1;
      newSignatures -= 50;
      setChatHistory(prev => [
        ...prev,
        `AI [neutral]: Incorrect. Penalty applied: -1 CC, -50 signatures.`,
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
            <button key={idx} onClick={() => handleAnswer(choice)}>{choice}</button>
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
