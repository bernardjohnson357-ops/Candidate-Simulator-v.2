// app/components/CandidateChat.tsx
"use client";

import { useState } from "react";

type CandidateChatProps = {
  path: "Party" | "Independent";
};

type Message = {
  sender: "system" | "user" | "ai";
  text: string;
};

export default function CandidateChat({ path }: CandidateChatProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: "system",
      text: `Welcome to the Federal Candidate Simulator! As your virtual campaign manager, I’ll guide you through the steps of running your campaign simulation. 
We’ll start by choosing your office and setting your strategy. Remember: this is simulation only—no political advice will be given.`,
    },
  ]);
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (!input.trim()) return;

    const userMessage: Message = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);

    // AI response (simulate GPT)
    const aiMessage: Message = {
      sender: "ai",
      text: `Got it! You said: "${input}". Next, let's move to the next step of the simulation.`,
    };

    setMessages((prev) => [...prev, aiMessage]);
    setInput("");
  };

  return (
    <div className="flex flex-col h-full p-4">
      <div className="flex-1 overflow-y-auto mb-4">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`mb-2 p-2 rounded ${
              msg.sender === "user"
                ? "bg-blue-200 self-end"
                : msg.sender === "ai"
                ? "bg-green-200 self-start"
                : "bg-gray-200 self-center"
            }`}
          >
            {msg.text}
          </div>
        ))}
      </div>
      <div className="flex space-x-2">
        <input
          className="flex-1 border rounded px-2 py-1"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button
          className="px-4 py-1 bg-blue-600 text-white rounded"
          onClick={sendMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
}
