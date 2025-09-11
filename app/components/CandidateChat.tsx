// app/components/CandidateChat.tsx
"use client";

import { useState } from "react";

// reference maps unchanged …
// (keep your realWorldReferences and simulatorReferences here)

export default function CandidateChat({ path }: { path: string }) {
  const [messages, setMessages] = useState<{ sender: string; text: string }[]>([
    {
      sender: "ai",
      text: `Welcome to the Candidate Simulator. You’ve chosen the **${path} path**. 
Candidate Coins (CC) are used to represent simulated campaign resources. 
**1 CC = $100 (simulated)**. These will be referenced whenever financial obligations arise.`,
    },
  ]);
  const [step, setStep] = useState(1);
  const [cc, setCc] = useState(50);
  const [signatures, setSignatures] = useState(0);
  const [input, setInput] = useState("");

  const addMessage = (msg: { sender: string; text: string }) =>
    setMessages((prev) => [...prev, msg]);

  const sendMessage = () => {
    if (!input.trim()) return;
    const userText = input.trim();
    addMessage({ sender: "user", text: userText });

    const lowerText = userText.toLowerCase();

    if (lowerText.includes("summary brief")) {
      const refs = [
        ...(realWorldReferences[step] || []),
        ...(simulatorReferences[step] || []),
      ].join("\n");

      addMessage({
        sender: "ai",
        text: `📘 **Brief Summary – Module ${step}**\nThis module introduces key compliance and campaign concepts.\n\n**References:**\n${refs}`,
      });
      setInput("");
      return;
    }

    if (lowerText.includes("summary detailed")) {
      const refs = [
        ...(realWorldReferences[step] || []),
        ...(simulatorReferences[step] || []),
      ].join("\n");

      addMessage({
        sender: "ai",
        text: `📘 **Detailed Summary – Module ${step}**\nThis module explains filing requirements and simulation mechanics step-by-step.\n\n**References:**\n${refs}`,
      });
      setInput("");
      return;
    }

    if (lowerText.includes("complete") || lowerText.includes("done")) {
      setStep(step + 1);
      setCc(cc + 10);
      setSignatures(signatures + 100);

      addMessage({
        sender: "ai",
        text: `✅ Module ${step} complete. Resources updated.\nCC: ${cc + 10} | Voter Support: ${
          signatures + 100
        } signatures`,
      });
      setInput("");
      return;
    }

    addMessage({
      sender: "ai",
      text: `I’ll guide you through Module ${step}. You can request a "summary brief" or "summary detailed", or confirm completion by typing "done".`,
    });

    setInput("");
  };

  return (
    <div className="p-4 border rounded shadow-md w-full max-w-2xl">
      <div className="h-96 overflow-y-auto border p-2 mb-2 bg-gray-50">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`mb-2 ${
              msg.sender === "ai" ? "text-blue-700" : "text-gray-800"
            }`}
          >
            <strong>{msg.sender === "ai" ? "AI" : "You"}:</strong> {msg.text}
          </div>
        ))}
      </div>

      <div className="flex">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-grow border px-2 py-1 rounded-l"
          placeholder="Type your message..."
        />
        <button
          onClick={sendMessage}
          className="bg-blue-600 text-white px-4 rounded-r"
        >
          Send
        </button>
      </div>

      <div className="mt-2 text-sm text-gray-600">
        CC: {cc} | Voter Support: {signatures} signatures
      </div>
    </div>
  );
}

      <div className="mt-2 text-sm text-gray-600">
        CC: {cc} | Voter Support: {signatures} signatures
      </div>
    </div>
  );
}
