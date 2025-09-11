// app/components/CandidateChat.tsx
"use client";

import { useState } from "react";

// Keep your realWorldReferences and simulatorReferences here
// Example placeholders:
const realWorldReferences: Record<number, string[]> = {};
const simulatorReferences: Record<number, string[]> = {};

type Message = {
  sender: string;
  text: string;
  options?: string[];
  refs?: string[];
  quizStep?: number; // optional for tracking quiz module
};

export default function CandidateChat({ path }: { path: string }) {
  const [messages, setMessages] = useState<Message[]>([
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
  const [quizAttempts, setQuizAttempts] = useState<Record<number, number>>({});

  const addMessage = (msg: Message) => setMessages((prev) => [...prev, msg]);

  const sendMessage = () => {
    if (!input.trim()) return;
    const userText = input.trim();
    addMessage({ sender: "user", text: userText });

    const lowerText = userText.toLowerCase();

    const lastMsg = messages[messages.length - 1];

    // ===== Quiz Handling =====
    if (lastMsg.options && lastMsg.quizStep) {
      const correctAnswer = "B"; // Dynamically set per quiz if needed
      const stepKey = lastMsg.quizStep;

      const attempts = quizAttempts[stepKey] || 0;

      if (userText.trim().toUpperCase() === correctAnswer) {
        const ccReward = 5;
        const sigReward = 50;
        setCc(cc + ccReward);
        setSignatures(signatures + sigReward);
        addMessage({
          sender: "ai",
          text: `✅ Correct! You earned +${ccReward} CC and +${sigReward} signatures.\nCC: ${
            cc + ccReward
          } | Voter Support: ${signatures + sigReward} signatures`,
        });
      } else {
        // Penalty logic
        const ccPenalty = attempts === 0 ? 1 : 2; // double penalty after first attempt
        const sigPenalty = attempts === 0 ? 50 : 100;
        setCc(cc - ccPenalty);
        setSignatures(signatures - sigPenalty);
        addMessage({
          sender: "ai",
          text: `❌ Incorrect. –${ccPenalty} CC and –${sigPenalty} signatures.\nCC: ${
            cc - ccPenalty
          } | Voter Support: ${signatures - sigPenalty} signatures`,
        });
      }

      // Update attempts
      setQuizAttempts({ ...quizAttempts, [stepKey]: attempts + 1 });
      setInput("");
      return;
    }

    // ===== Summaries =====
    if (lowerText.includes("summary brief") || lowerText.includes("summary detailed")) {
      const refs = [
        ...(realWorldReferences[step] || []),
        ...(simulatorReferences[step] || []),
      ].join("\n");

      addMessage({
        sender: "ai",
        text: `📘 **${
          lowerText.includes("brief") ? "Brief" : "Detailed"
        } Summary – Module ${step}**\nThis module explains key compliance and campaign concepts.\n\n**References:**\n${refs}`,
      });
      setInput("");
      return;
    }

    // ===== Complete Module =====
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

      // Optionally add next quiz automatically
      if (step === 2) {
        addMessage({
          sender: "ai",
          text: "📝 **Quiz – Module 2A (FEC Filing)**\nWhich FEC form registers a campaign committee?",
          options: [
            "A) Form 1 – Statement of Candidacy",
            "B) Form 2 – Statement of Organization",
            "C) Form 3 – Quarterly Report",
            "D) Form 5 – Independent Expenditures",
          ],
          refs: ["https://www.fec.gov/resources/cms-content/documents/policy-guidance/partygui.pdf"],
          quizStep: 2,
        });
      }

      setInput("");
      return;
    }

    // ===== Default AI Guidance =====
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
            className={`mb-2 ${msg.sender === "ai" ? "text-blue-700" : "text-gray-800"}`}
          >
            <strong>{msg.sender === "ai" ? "AI" : "You"}:</strong> {msg.text}

            {/* Render references */}
            {msg.refs && msg.refs.length > 0 && (
              <ul className="text-xs text-gray-500 mt-1">
                {msg.refs.map((ref, i) => (
                  <li key={i}>
                    <a href={ref} target="_blank" className="underline text-blue-500">
                      {ref}
                    </a>
                  </li>
                ))}
              </ul>
            )}

            {/* Render quiz options */}
            {msg.options && msg.options.length > 0 && (
              <ul className="list-disc list-inside mt-2 text-gray-700">
                {msg.options.map((opt, i) => (
                  <li key={i}>{opt}</li>
                ))}
              </ul>
            )}
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
