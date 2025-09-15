"use client";

import { useEffect, useState } from "react";
import { useGameState } from "@/context/GameStateContext";
import { getAINarrative, AIResponse } from "@/lib/aiHelpers";

interface ChatEntry {
  from: "AI" | "User";
  text: string;
}

export default function ChatSimulator({ moduleTexts }: { moduleTexts: string[] }) {
  const { cc, setState, signatures, voterApproval, currentModule, history } = useGameState();
  const [chat, setChat] = useState<ChatEntry[]>([]);
  const [userInput, setUserInput] = useState("");

  const advanceModule = async (input?: string) => {
    const moduleText = moduleTexts[currentModule] ?? "No module text available";
    const aiResp: AIResponse = await getAINarrative(moduleText, { cc, signatures, voterApproval, currentModule, branch: null, history }, input);

    setChat(prev => [...prev, { from: "AI", text: aiResp.narrative }]);
    setState({
      cc: cc + (aiResp.ccDelta ?? 0),
      signatures: signatures + (aiResp.signaturesDelta ?? 0),
      currentModule: currentModule + 1,
      history: [...history, aiResp.narrative],
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setChat(prev => [...prev, { from: "User", text: userInput }]);
    advanceModule(userInput);
    setUserInput("");
  };

  useEffect(() => {
    if (chat.length === 0) advanceModule(); // initial prompt
  }, []);

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <div className="space-y-2">
        {chat.map((entry, i) => (
          <div key={i} className={entry.from === "AI" ? "text-left" : "text-right"}>
            <strong>{entry.from}:</strong> {entry.text}
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="mt-4 flex">
        <input
          value={userInput}
          onChange={e => setUserInput(e.target.value)}
          placeholder="Type your response..."
          className="flex-grow border p-2 rounded"
        />
        <button type="submit" className="ml-2 p-2 bg-blue-500 text-white rounded">Send</button>
      </form>
    </div>
  );
}
