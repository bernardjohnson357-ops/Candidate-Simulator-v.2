// app/components/ChatSimulator.tsx
"use client";

import { useState, useEffect } from "react";
import { useGameContext } from "../context/GameContext";
import { Quiz } from "./Quiz";

// Import Markdown modules
import ORIENTATION from '../../ORIENTATION.md';
import SCRIPT from '../../SCRIPT.md';
import MASTER_ROADMAP from '../../MASTER_ROADMAP.md';
import REFERENCE_ROADMAP from '../../REFERENCE_ROADMAP.md';
import CAMPAIGN_SEQUENCE from '../../CAMPAIGN_SEQUENCE.md';

interface Module {
  question: string;
  options: string[];
  correctAnswer: string;
  signatureValue?: number;
  scenarioText?: string;
  choices?: string[];
}

const ChatSimulator = () => {
  const { state, setState } = useGameContext();
  const [chatHistory, setChatHistory] = useState<string[]>([]);
  const [currentModule, setCurrentModule] = useState<Module | null>(null);
  const [loading, setLoading] = useState(false);

  // --- Generate quiz dynamically using AI ---
  const generateQuiz = async (moduleText: string): Promise<Module> => {
    setLoading(true);

    // Call AI (pseudo-code; replace with your API integration)
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

    // Replace with actual API call
    const response = await fetch("/api/generateQuiz", {
      method: "POST",
      body: JSON.stringify({ prompt }),
    });
    const data = await response.json();

    setLoading(false);
    return data as Module;
  };

  // --- Load current module ---
  useEffect(() => {
    const loadModule = async () => {
      let moduleText = "";

      // Determine Markdown content based on module number
      switch (state.module) {
        case 0:
          moduleText = ORIENTATION;
          break;
        default:
          moduleText = SCRIPT; // fallback or use mapping from MASTER_ROADMAP
          break;
      }

      const generated = await generateQuiz(moduleText);
      setCurrentModule(generated);
    };

    loadModule();
  }, [state.module]);

  const handleQuizAnswer = (answer: string) => {
    if (!currentModule) return;

    let newCC = state.CC;
    let newSignatures = state.signatures;

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

    const newVoterApproval = newSignatures * 0.0001;

    setState({
      ...state,
      CC: newCC,
      signatures: newSignatures,
      voterApproval: newVoterApproval,
      module: state.module + 1,
    });

    setCurrentModule(null); // trigger reload for next module
  };

  const handleScenarioChoice = (choice: string) => {
    setChatHistory(prev => [
      ...prev,
      `AI [neutral]: You chose "${choice}". Consequences applied per simulator rules.`,
    ]);

    setState({
      ...state,
      module: state.module + 1,
    });

    setCurrentModule(null); // trigger reload
  };

  if (loading || !currentModule) {
    return <div className="chat-bubble ai">Loading module...</div>;
  }

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
          onAnswer={handleQuizAnswer}
        />
      ) : currentModule.scenarioText && currentModule.choices ? (
        <div className="chat-scenario">
          <p>{currentModule.scenarioText}</p>
          {currentModule.choices.map((choice, idx) => (
            <button key={idx} onClick={() => handleScenarioChoice(choice)}>
              {choice}
            </button>
          ))}
        </div>
      ) : (
        <div className="chat-bubble ai">
          {currentModule.scenarioText || "Module content unavailable."}
        </div>
      )}

      <div className="chat-status">
        <p>CC: {state.CC} | Signatures: {state.signatures} | Voter Approval: {(state.voterApproval * 100).toFixed(2)}%</p>
      </div>
    </div>
  );
};

export default ChatSimulator;
