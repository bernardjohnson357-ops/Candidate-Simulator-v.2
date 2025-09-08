"use client";

import React, { useState, useRef } from "react";

interface CandidateInteractionProps {
  onSubmit: (text: string) => Promise<string>; // hook to your model
}

const CandidateInteraction: React.FC<CandidateInteractionProps> = ({ onSubmit }) => {
  const [userInput, setUserInput] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  // 🎤 Start/stop voice capture
  const handleVoiceInput = () => {
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

    recognitionRef.current.onresult = (event: SpeechRecognitionEvent) => {
      const transcript = event.results[0][0].transcript;
      setUserInput(transcript);
    };

    recognitionRef.current.start();
  };

  // 🔊 Speak model output
  const speak = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    speechSynthesis.speak(utterance);
  };

  // 📤 Submit response to model
  const handleSubmit = async () => {
    if (!userInput.trim()) return;
    setLoading(true);
    try {
      const result = await onSubmit(userInput);
      setResponse(result);
      speak(result); // auto-play audio output
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-4 p-4 border rounded-lg bg-white shadow">
      {/* User input area */}
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
        placeholder="Type your response or use the microphone..."
      />

      {/* Controls */}
      <div className="flex gap-2">
        <button
          onClick={handleVoiceInput}
          className="px-4 py-2 bg-blue-600 text-white rounded"
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

      {/* Model response */}
      {response && (
        <div className="p-3 border border-gray-200 rounded bg-gray-50 whitespace-pre-wrap">
          {response}
        </div>
      )}
    </div>
  );
};

export default CandidateInteraction;
