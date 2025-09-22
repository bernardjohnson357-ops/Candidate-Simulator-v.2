// File: app/components/CandidateSimulator.tsx
"use client";
import React, { useState, useRef, useEffect } from "react";
import { ModuleState } from "../ai/types";
import { speak } from "../utils/audioUtils";

interface CandidateSimulatorProps {
  modules: ModuleState[];
}

const CandidateSimulator: React.FC<CandidateSimulatorProps> = ({ modules }) => {
  const [currentModuleIndex, setCurrentModuleIndex] = useState(0);
  const [userInput, setUserInput] = useState("");
  const [messages, setMessages] = useState<string[]>([]);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [listening, setListening] = useState(false);
  const [paused, setPaused] = useState(false);

  // Campaign state
  const [cc, setCC] = useState(50); // Starting CC
  const [signatures, setSignatures] = useState(0);
  const [approval, setApproval] = useState(0);

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);

  const currentModule = modules[currentModuleIndex];

  // Compute voter approval from signatures
  const calculateApproval = (sigs: number) => sigs / 100;

  const handleSubmit = () => {
    if (!userInput.trim()) return;

    const newMsg = `User: ${userInput}`;
    setMessages([...messages, newMsg]);

    // For AI narration, use detailedSummary
    const aiResponse = currentModule.detailedSummary || "AI: Response placeholder.";
    setMessages(prev => [...prev, aiResponse]);

    // Scoring logic example (simplified)
    let earnedCC = 0;
    let earnedSignatures = 0;

    // Basic keyword-based scoring placeholder
    if (userInput.toLowerCase().includes("correct") || userInput.toLowerCase().includes("submit")) {
      earnedSignatures = 50; // example reward
      earnedCC = 1;
    } else {
      earnedSignatures = -10; // penalty
      earnedCC = -1;
    }

    setSignatures(prev => prev + earnedSignatures);
    setCC(prev => Math.max(prev + earnedCC, 0));
    setApproval(prev => Math.min(Math.max(calculateApproval(signatures + earnedSignatures), 0), 100));

    if (userInput.toLowerCase().includes("continue")) {
      setPaused(false);
      nextModule();
    } else {
      setPaused(true);
    }

    setUserInput("");
  };

  const nextModule = () => {
    if (currentModuleIndex < modules.length - 1) {
      setCurrentModuleIndex(currentModuleIndex + 1);
      setPaused(false);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => setUploadedImage(reader.result as string);
    reader.readAsDataURL(file);
  };

  const handleAudioRecord = async () => {
    setListening(true);
    try {
      await speak("Recording simulated. Please say your input.");
    } finally {
      setListening(false);
    }
  };

  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = "auto";
      textAreaRef.current.style.height = textAreaRef.current.scrollHeight + "px";
    }
  }, [userInput]);

  return (
    <div className="candidate-simulator p-4 max-w-3xl mx-auto">
      <h2 className="text-xl font-bold mb-2">
        Module {currentModuleIndex}: {currentModule.title}
      </h2>

      <div className="chat-box border p-2 mb-4 h-64 overflow-y-auto">
        {messages.map((msg, idx) => (
          <div key={idx} className="mb-2">{msg}</div>
        ))}
      </div>

      <div className="mb-2">
        <strong>CC:</strong> {cc} | <strong>Signatures:</strong> {signatures} | <strong>Approval:</strong> {approval.toFixed(1)}%
      </div>

      {uploadedImage && (
        <div className="mb-2">
          <img src={uploadedImage} alt="Uploaded" className="max-h-40 rounded border" />
        </div>
      )}

      <textarea
        ref={textAreaRef}
        className="w-full border p-2 mb-2 rounded resize-none"
        placeholder="Type your response..."
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
      />

      <div className="flex gap-2">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={handleSubmit}
        >
          Submit
        </button>

        <button
          className={`bg-green-500 text-white px-4 py-2 rounded ${listening ? "opacity-50" : ""}`}
          onClick={handleAudioRecord}
          disabled={listening}
        >
          {listening ? "Recording..." : "Record Audio"}
        </button>

        <button
          className="bg-gray-500 text-white px-4 py-2 rounded"
          onClick={() => fileInputRef.current?.click()}
        >
          Upload Image
        </button>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleImageUpload}
        />
      </div>

      {paused && (
        <div className="mt-2 text-yellow-600 font-semibold">
          Please type or say “continue” to proceed.
        </div>
      )}
    </div>
  );
};

export default CandidateSimulator;
