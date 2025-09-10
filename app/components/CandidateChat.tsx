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
      text: `Welcome to the Federal Candidate Simulator. I will guide you through a realistic campaign simulation.
- You start with 50 Candidate Coins (CC), which represent simulated campaign resources.
- Campaign tasks and exercises allocate these resources and build voter support (signatures).
- Signatures = voter support (1 signature = 0.0001 approval).
- Modules are sequential; instructions, exercises, and scenario prompts are professional and instructional.
- Typed or spoken responses are used in later modules (7–9) to simulate real-world communication.`,
    },
  ]);

  const [input, setInput] = useState("");
  const [cc, setCC] = useState(50);
  const [signatures, setSignatures] = useState(0);
  const [step, setStep] = useState<number>(1); // Tracks Module 1–15

  // Track if speech input is enabled
  const [speechEnabled, setSpeechEnabled] = useState(false);
  const [imageUploadEnabled, setImageUploadEnabled] = useState(false);

  // Helper to append messages
  const addMessage = (msg: Message) => setMessages((prev) => [...prev, msg]);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;

    addMessage({ sender: "user", text });

    let aiResponse = "";
    let nextStep = step + 1;

    switch (step) {
      // Modules 1–2: Filing quizzes
      case 1:
      case 2:
        aiResponse = `Module ${step}: Filing exercises complete. Resources and voter support updated.`;
        setCC((prev) => prev + 5); // Simulated gain
        setSignatures((prev) => prev + 50);
        break;

      // Modules 3–4: Campaign setup & identity
      case 3:
        aiResponse = "Module 3: Campaign setup complete. Allocate resources and recruit team members.";
        setCC((prev) => prev + 5);
        setSignatures((prev) => prev + 50);
        break;

      case 4:
        aiResponse = "Module 4: Campaign identity exercises complete. Slogan, mission statement, and issues submitted.";
        setCC((prev) => prev + 5);
        setSignatures((prev) => prev + 50);
        break;

      // Module 5: Campaign materials + scenario exercises
      case 5:
        aiResponse = `Module 5: Campaign Expansion.
Please describe or upload your campaign materials (signs, shirts, promo items).
Then, respond to scenario decisions: endorsements, petitions, legislative response.`;
        setImageUploadEnabled(true); // Unlock image submission
        break;

      // Module 6: FEC compliance & scenarios
      case 6:
        aiResponse = `Module 6: FEC compliance exercises and scenarios complete. CC and voter support updated based on responses.`;
        setCC((prev) => prev + 5);
        setSignatures((prev) => prev + 50);
        break;

      // Modules 7–9: Speech or typed input
      case 7:
      case 8:
      case 9:
        aiResponse = `Module ${step}: Please respond to the scenario by typing or speaking your answer. Speech input enabled.`;
        setSpeechEnabled(true);
        break;

      // Module 10: Audio + image review
      case 10:
        aiResponse = `Module 10: Election Countdown.
Submit final outreach exercises. Audio input/output and image upload enabled for review.`;
        setSpeechEnabled(true);
        setImageUploadEnabled(true);
        break;

      // Modules 11–14: Election week scenarios
      case 11:
        aiResponse = "Module 11: School Visit scenario complete. Voter support adjusted based on clarity and empathy.";
        setCC((prev) => prev + 5);
        setSignatures((prev) => prev + 50);
        break;

      case 12:
        aiResponse = "Module 12: Television interview complete. Resources and voter support updated.";
        setCC((prev) => prev + 5);
        setSignatures((prev) => prev + 50);
        break;

      case 13:
        aiResponse = "Module 13: Pro-Israel group meeting complete. Outcome reflected in simulated CC and voter approval.";
        setCC((prev) => prev + 5);
        setSignatures((prev) => prev + 50);
        break;

      case 14:
        aiResponse = "Module 14: Debate night complete. Performance impacts final voter support.";
        setCC((prev) => prev + 5);
        setSignatures((prev) => prev + 50);
        break;

      case 15:
        aiResponse = `Module 15: Final Summary.
- Campaign Resources: ${cc} CC
- Voter Support: ${signatures} signatures
- Path Taken: ${path}
- Strengths & Weaknesses assessed by AI.
Simulation complete. Reflect on your experience.`;
        nextStep = 15; // Stay on final module
        setSpeechEnabled(false);
        setImageUploadEnabled(false);
        break;

      default:
        aiResponse = "Simulation complete.";
        nextStep = step;
        break;
    }

    addMessage({ sender: "ai", text: aiResponse });
    setStep(nextStep);
  };

  // Placeholder handlers for speech and image upload
  const handleSpeechInput = (spokenText: string) => {
    sendMessage(spokenText);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      addMessage({ sender: "user", text: `[Image uploaded: ${file.name}]` });
      addMessage({ sender: "ai", text: "Image reviewed. Feedback provided on clarity, layout, and professional presentation." });
      // Simulate resource/voter support updates
      setCC((prev) => prev + 5);
      setSignatures((prev) => prev + 50);
    }
  };

  return (
    <div className="flex flex-col h-full p-4 max-w-3xl mx-auto">
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

      <div className="flex space-x-2 mb-2">
        <input
          className="flex-1 border rounded px-2 py-1"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage(input)}
          placeholder="Type your response..."
        />
        <button
          className="px-4 py-1 bg-blue-600 text-white rounded"
          onClick={() => sendMessage(input)}
        >
          Send
        </button>
      </div>

      {speechEnabled && (
        <button
          className="px-4 py-1 bg-green-600 text-white rounded mb-2"
          onClick={() => alert("Speech input would start here.")}
        >
          Speak
        </button>
      )}

      {imageUploadEnabled && (
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="mt-2"
        />
      )}

      <div className="mt-2 text-sm text-gray-600">
        CC: {cc} | Voter Support: {signatures} signatures
      </div>
    </div>
  );
}
