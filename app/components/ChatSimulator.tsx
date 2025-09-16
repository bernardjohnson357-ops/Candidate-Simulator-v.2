// app/components/ChatSimulator.tsx
"use client";

import { useState } from "react";
import { useGameContext } from "../context/GameContext";
import { Quiz } from "./Quiz";
import referenceRoadmap from "../../config/reference_roadmap.json";

const ChatSimulator = () => {
  const { state } = useGameContext();
  const [chatHistory, setChatHistory] = useState<string[]>([]);

  const currentModule = referenceRoadmap[state.module];

  if (!currentModule) return <div className="chat-bubble ai">Simulation complete!</div>;

  return (
    <div className="chat-container">
      {chatHistory.map((msg, idx) => (
        <div key={idx} className="chat-bubble user">{msg}</div>
      ))}
      <Quiz
        question={currentModule.question}
        options={currentModule.options}
        correctAnswer={currentModule.correctAnswer}
        signatureValue={currentModule.signatureValue}
      />
    </div>
  );
};

export default ChatSimulator;
