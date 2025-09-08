"use client";

import React, { useState, useRef } from "react";

interface CandidateInteractionProps {}

const CandidateInteraction: React.FC<CandidateInteractionProps> = () => {
  const [userInput, setUserInput] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  // 🎤 Start voice capture
  const handleVoiceInput = () => {
    if (!("webkitSpeechRecognition" in window || "SpeechRecognition" in window)) {
      alert("Your browser doesn’t support speech recognition.");
      return;
    }

    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
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

  // 🔊 Speak response aloud
  const speak = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    speechSynthesis.speak(utterance);
  };

  // 📤 Send to API route
  const handleSubmit = async () => {
    if (!userInput.trim()) return;
    setLoading(true);
    try {
      const res = await fetch("/api/respond", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ input: userInput }),
      });

      const data = await res.json();
      if (data.output) {
        setResponse(data.output);
        speak(data.output);
      } else {
        setResponse("⚠️ No response from model.");
      }
    } catch (err) {
      console.error(err);
      setResponse("❌ Error connecting to API.");
    } finally {
      setLoading(false);
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
        placeholder="Type your response or use the microphone..."
      />

      {/* Buttons */}
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
