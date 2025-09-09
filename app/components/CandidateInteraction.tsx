"use client";

import React, { useState, useRef } from "react";

interface CandidateInteractionProps {
  initialModule?: number;
  initialCoins?: number;
}

type Message = {
  role: "user" | "assistant" | "system";
  content: string;
};

const CandidateInteraction: React.FC<CandidateInteractionProps> = ({
  initialModule = 0,
  initialCoins = 50,
}) => {
  const [userInput, setUserInput] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentModule, setCurrentModule] = useState(initialModule);
  const [candidateCoins, setCandidateCoins] = useState(initialCoins);

  // Reference to the speech recognition instance
  const recognitionRef = useRef<any | null>(null);

  // 🎤 Voice input (only enabled for module 7+)
  const handleVoiceInput = () => {
    if (currentModule < 7) return; // early exit for pre-October modules
    if (!("webkitSpeechRecognition" in window || "SpeechRecognition" in window)) {
      alert("Your browser doesn’t support speech recognition.");
      return;
    }

    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    recognitionRef.current = new SpeechRecognition();
    recognitionRef.current.continuous = false;
    recognitionRef.current.interimResults = false;
    recognitionRef.current.lang = "en-US";

    recognitionRef.current.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setUserInput(transcript);
    };

    recognitionRef.current.start();
  };

  // 🔊 Speak response aloud (only module 7+)
  const speak = (text: string) => {
    if (currentModule < 7) return;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    speechSynthesis.speak(utterance);
  };

  // 📤 Submit user input to the simulator API
  const handleSubmit = async () => {
    if (!userInput.trim()) return;
    setLoading(true);

    // Add user message to messages array
    const newMessages: Message[] = [...messages, { role: "user", content: userInput }];
    setMessages(newMessages);

    try {
      const res = await fetch("/api/simulator", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: newMessages,
          currentModule,
          candidateCoins,
        }),
      });

      const data = await res.json();

      if (data.output) {
        const assistantMessage: Message = { role: "assistant", content: data.output };
        setMessages([...newMessages, assistantMessage]);
        setResponse(data.output);
        speak(data.output);
      } else {
        setResponse("⚠️ No response from API.");
      }
    } catch (err) {
      console.error(err);
      setResponse("❌ Error connecting to API.");
    } finally {
      setLoading(false);
      setUserInput(""); // clear input after submission
    }
  };

  return (
    <div className="flex flex-col gap-4 p-4 border rounded-lg bg-white shadow">
      {/* Input area */}
      <textarea
        className="w-full p-3 border border-gray-300 rounded resize-none overflow-hidden"
        style={{ minHeight: "100px", maxHeight: "300px" }}
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        onInput={(e) => {
          const target = e.target as HTMLTextAreaElement;
          target.style.height = "auto";
          target.style.height = target.scrollHeight + "px";
        }}
        placeholder="Which federal office would you like to run for?"
      />

      {/* Buttons */}
      <div className="flex gap-2">
        <button
          onClick={handleVoiceInput}
          className={`px-4 py-2 rounded text-white ${
            currentModule >= 7 ? "bg-blue-600" : "bg-gray-400 cursor-not-allowed"
          }`}
          disabled={currentModule < 7}
        >
          🎤 Speak
        </button>
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="px-4 py-2 bg-green-600 text-white rounded"
        >
          {loading ? "Loading..." : "Submit"}
        </button>
      </div>

      {/* Assistant response */}
      {response && (
        <div className="p-3 border border-gray-200 rounded bg-gray-50 whitespace-pre-wrap">
          {response}
        </div>
      )}
    </div>
  );
};

export default CandidateInteraction;
