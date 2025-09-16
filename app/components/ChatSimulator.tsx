// app/components/ChatSimulator.tsx
"use client";

import { useState } from "react";
import { useGameContext } from "../context/GameContext";
import { Quiz } from "./Quiz";
import referenceRoadmapData from "../../config/reference_roadmap.json";

// --- Type Definitions ---
interface Module {
  question?: string;
  options?: string[];
  correctAnswer?: string;
  signatureValue?: number;
  scenarioText?: string;
  choices?: string[];
}

interface ReferenceRoadmap {
  modules: Record<string, Module>;
}

interface GameState {
  module: number; // numeric index
  CC: number;
  signatures: number;
  voterApproval: number;
  path: "Independent" | "Party" | "Write-In";
}

// --- Module Mapping (numeric state.module → JSON key) ---
const moduleMap: Record<number, string> = {
  0: "0",
  1: "1A",
  2: "2A",
  3: "1B",
  4: "2B",
  5: "3",
  6: "4",
  7: "5",
  8: "6",
  9: "7",
  10: "8",
  11: "9",
  12: "10",
  13: "11",
  14: "12",
  15: "13",
  // add remaining mappings up to module 15 as needed
};

const referenceRoadmap: ReferenceRoadmap = referenceRoadmapData;

// --- Chat Simulator Component ---
const ChatSimulator = () => {
  const { state, setState } = useGameContext();
  const [chatHistory, setChatHistory] = useState<string[]>([]);

  const moduleKey = moduleMap[state.module];
  const currentModule = moduleKey ? referenceRoadmap.modules[moduleKey] : null;

  if (!currentModule) {
    return <div className="chat-bubble ai">Simulation complete!</div>;
  }

  const handleQuizAnswer = (answer: string) => {
    let newCC = state.CC;
    let newSignatures = state.signatures;

    // Evaluate multiple-choice
    if (currentModule.correctAnswer) {
      if (answer === currentModule.correctAnswer) {
        newSignatures += currentModule.signatureValue || 20;
        newCC += 1; // bonus CC for >=80%
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
    }

    const newVoterApproval = newSignatures * 0.0001;

    setState({
      ...state,
      CC: newCC,
      signatures: newSignatures,
      voterApproval: newVoterApproval,
      module: state.module + 1,
    });
  };

  const handleScenarioChoice = (choice: string) => {
    // Simple placeholder: increment module, update chat
    setChatHistory(prev => [
      ...prev,
      `AI [neutral]: You chose "${choice}". Consequences applied per simulator rules.`,
    ]);

    setState({
      ...state,
      module: state.module + 1,
    });
  };

  return (
    <div className="chat-container">
      {chatHistory.map((msg, idx) => (
        <div key={idx} className="chat-bubble user">{msg}</div>
      ))}

      {currentModule.question && currentModule.options ? (
        <Quiz
          question={currentModule.question}
          options={currentModule.options}
          correctAnswer={currentModule.correctAnswer || ""}
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
