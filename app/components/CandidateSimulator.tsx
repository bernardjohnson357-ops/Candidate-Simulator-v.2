// File: app/components/CandidateSimulator.tsx
"use client";
import React, { useState, useEffect } from "react";
import { libertarianSimulator, ModuleState } from "../ai/libertarianSimulator";
import { speak } from "../utils/audioUtils";

const CandidateSimulator: React.FC = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [state, setState] = useState<ModuleState>({
    office: "House", // default until user picks
    cc: 50,
    signatures: 0,
    approval: 0,
    threshold: { cc: 0, approval: 0, sigs: 0 },
  });

  const currentModule = libertarianSimulator[currentIndex];

  // Narrator speaks whenever module changes
  useEffect(() => {
    if (currentModule?.narrator) {
      speak(currentModule.narrator);
    }
  }, [currentModule]);

  // Handle text submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    let newState = { ...state };
    const text = currentModule.logic
      ? currentModule.logic(input, newState)
      : "No logic found for this module.";

    setState(newState);
    setOutput(text);
    setInput("");
    setCurrentIndex((prev) => Math.min(prev + 1, libertarianSimulator.length - 1));

    // Speak narrator for the next module
    setTimeout(() => {
      if (libertarianSimulator[currentIndex + 1]?.narrator) {
        speak(libertarianSimulator[currentIndex + 1].narrator);
      }
    }, 500);
  };

  // Handle image uploads (unlocked at Module 5)
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      let newState = { ...state };
      const result = currentModule?.logic?.("upload", newState) || "";
      setState(newState);
      setOutput(result + ` (File: ${file.name})`);
    }
  };

  // Handle audio input (unlocked at Module 7)
  const handleStartListening = () => {
    if (typeof window !== "undefined") {
      const SpeechRecognition =
        (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (!SpeechRecognition) {
        alert("Speech Recognition not supported in this browser.");
        return;
      }

      const recognition = new SpeechRecognition();
      recognition.lang = "en-US";
      recognition.start();

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
      };
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4 bg-white shadow rounded">
      <h1 className="text-xl font-bold mb-4">{currentModule.title}</h1>
      <p className="mb-2">{currentModule.narrator}</p>
      <p className="italic mb-4">{currentModule.prompt}</p>

      {/* Output area */}
      {output && (
        <div className="mb-4 p-2 bg-gray-100 border rounded">
          <strong>Simulator:</strong> {output}
        </div>
      )}

      {/* Input form */}
      <form onSubmit={handleSubmit} className="mb-4 flex gap-2">
        <input
          type="text"
          className="flex-1 border p-2 rounded"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your response..."
        />

        {/* Mic button (active at Module 7) */}
        <button
          type="button"
          onClick={handleStartListening}
          disabled={currentIndex < 7}
          className={`px-3 py-2 rounded ${
            currentIndex < 7 ? "bg-gray-300" : "bg-red-500 text-white"
          }`}
        >
          🎤
        </button>

        {/* Image upload button (active at Module 5) */}
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          disabled={currentIndex < 5}
          className="hidden"
          id="image-upload"
        />
        <label
          htmlFor="image-upload"
          className={`px-3 py-2 rounded cursor-pointer ${
            currentIndex < 5 ? "bg-gray-300" : "bg-blue-500 text-white"
          }`}
        >
          🖼
        </label>

        <button
          type="submit"
          className="px-4 py-2 bg-green-500 text-white rounded"
        >
          Send
        </button>
      </form>

      {/* Debug game state */}
      <div className="mt-4 p-2 bg-gray-50 border rounded text-sm">
        <p>CC: {state.cc}</p>
        <p>Signatures: {state.signatures}</p>
        <p>Approval: {state.approval}%</p>
      </div>
    </div>
  );
};

export default CandidateSimulator;
