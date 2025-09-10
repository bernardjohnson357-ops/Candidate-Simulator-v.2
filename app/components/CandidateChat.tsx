// app/components/CandidateChat.tsx
"use client";

import { useState, useEffect } from "react";

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
- You start with 50 Candidate Coins (CC), representing simulated campaign resources.
- Completing campaign tasks allocates these resources and builds voter support (signatures).
- Signatures = voter support (1 signature = 0.0001 approval).
- Typed or spoken responses will be used in selected modules (7–10).
- Image upload is optional after Module 5. All feedback is instructional.`,
    },
  ]);

  const [input, setInput] = useState("");
  const [cc, setCC] = useState(50);
  const [signatures, setSignatures] = useState(0);
  const [step, setStep] = useState(1); // Tracks Module 1–15

  const [speechEnabled, setSpeechEnabled] = useState(false);
  const [imageUploadEnabled, setImageUploadEnabled] = useState(false);

  // Append a message
  const addMessage = (msg: Message) =>
    setMessages((prev) => [...prev, msg]);

  // Handle text or speech input
  const sendMessage = (text: string) => {
    if (!text.trim()) return;

    addMessage({ sender: "user", text });
    let aiResponse = "";
    let nextStep = step + 1;

    // Determine AI response based on current module
    switch (step) {
      case 1: // Module 1: Filing
      case 2:
        aiResponse = `Module ${step}: Filing exercises complete. Resources and voter support updated.`;
        setCC((prev) => prev + 5);
        setSignatures((prev) => prev + 50);
        break;

      case 3: // Campaign setup
      case 4:
        aiResponse = `Module ${step}: Campaign identity exercises complete. Resources and voter support updated.`;
        setCC((prev) => prev + 5);
        setSignatures((prev) => prev + 50);
        break;

      case 5: // Campaign Expansion / Materials
        aiResponse = `Module 5: Campaign Expansion.
Please describe or upload your campaign materials (signs, shirts, promo items). Then respond to scenario decisions: endorsements, petitions, or legislative responses.`;
        setImageUploadEnabled(true);
        break;

      case 6: // FEC compliance
        aiResponse = `Module 6: FEC compliance exercises complete. Resources and voter support updated.`;
        setCC((prev) => prev + 5);
        setSignatures((prev) => prev + 50);
        break;

      case 7: // Early October Ops (speech/typed)
      case 8:
      case 9:
        aiResponse = `Module ${step}: Please respond to the scenario by typing or speaking your answer. Speech input enabled.`;
        setSpeechEnabled(true);
        break;

      case 10: // Election Countdown
        aiResponse = `Module 10: Final outreach exercises. Audio input/output and image upload are available for review.`;
        setSpeechEnabled(true);
        setImageUploadEnabled(true);
        break;

      case 11:
      case 12:
      case 13:
      case 14:
        aiResponse = `Module ${step}: Election week scenario complete. Resources and voter support updated.`;
        setCC((prev) => prev + 5);
        setSignatures((prev) => prev + 50);
        break;

      case 15: // Final Summary
        aiResponse = `Module 15: Simulation complete.
- Campaign Resources: ${cc} CC
- Voter Support: ${signatures} signatures
- Path Taken: ${path}
- Strengths & Weaknesses assessed by AI.`;
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

  // Speech-to-text handler (Web Speech API)
  const startSpeechRecognition = () => {
    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Speech recognition not supported in this browser.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onresult = (event: any) => {
      const spokenText = event.results[0][0].transcript;
      sendMessage(spokenText);
    };

    recognition.onerror = (event: any) => {
      console.error("Speech recognition error:", event.error);
    };

    recognition.start();
  };

  // Text-to-speech handler
  const speakText = (text: string) => {
    if (!("speechSynthesis" in window)) return;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    window.speechSynthesis.speak(utterance);
  };

  // Image upload handler
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    addMessage({ sender: "user", text: `[Image uploaded: ${file.name}]` });
    addMessage({
      sender: "ai",
      text: "Image reviewed. Feedback provided on clarity, layout, and professional presentation. Simulated campaign resources and voter support updated.",
    });

    // Simulated adjustments
    setCC((prev) => prev + 5);
    setSignatures((prev) => prev + 50);
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
          onClick={startSpeechRecognition}
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
