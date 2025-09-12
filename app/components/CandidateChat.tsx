// app/components/CandidateChat.tsx
"use client";

import { useState, useEffect } from "react";

type Message = {
  sender: string;
  text: string;
  options?: string[];
};

export default function CandidateChat({ path }: { path: "Party" | "Independent" }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [cc, setCc] = useState(50);
  const [signatures, setSignatures] = useState(0);
  const [voterApproval, setVoterApproval] = useState(0);
  const [input, setInput] = useState("");

  const addMessage = (msg: Message) => setMessages(prev => [...prev, msg]);

  useEffect(() => {
    addMessage({ sender: "ai", text: `### Module 0 – Introduction\n🎯 Learn how the simulator works. Start with 50 CC.` });
  }, []);

  const sendMessage = () => {
    if (!input.trim()) return;
    addMessage({ sender: "user", text: input.trim() });
    addMessage({ sender: "ai", text: `Received: ${input.trim()}` });
    setInput("");
  };

  return (
    <div style={{ width: "100%", maxWidth: "768px" }}>
      <div style={{ maxHeight: "384px", overflowY: "auto" }}>
        {messages.map((msg, idx) => (
          <div key={idx} className={`chat-box ${msg.sender === "ai" ? "ai-msg" : "user-msg"}`}>
            <strong>{msg.sender === "ai" ? "AI" : "You"}:</strong> {msg.text}
            {msg.options && (
              <ul style={{ marginTop: "8px", paddingLeft: "16px" }}>
                {msg.options.map((opt, i) => (<li key={i}>{opt}</li>))}
              </ul>
            )}
          </div>
        ))}
      </div>

      <div className="input-container">
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          className="input-box"
          placeholder="Type your message..."
        />
        <button onClick={sendMessage} className="send-btn">Send</button>
      </div>

      <div className="status-bar">
        CC: {cc} | Voter Signatures: {signatures} | Voter Approval: {voterApproval.toFixed(2)}%
      </div>
    </div>
  );
}
