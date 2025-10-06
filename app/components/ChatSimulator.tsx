"use client";

import React, { useState, useEffect } from "react";
import { runModule, initCandidateState } from "@/app/ai/aiLoop";
import { CandidateState, Module } from "@/app/ai/types";
import ModuleDisplay from "@/app/components/ModuleDisplay";

/**
 * ✅ Safely loads a module JSON file and validates its structure.
 */
const loadModule = async (id: string): Promise<Module | null> => {
  try {
    const mod = await import(`../data/modules/module${id}.json`);
    const moduleData = mod.default as unknown;

    if (
      typeof moduleData !== "object" ||
      !moduleData ||
      !("id" in moduleData) ||
      !("title" in moduleData) ||
      !Array.isArray((moduleData as any).tasks)
    ) {
      console.warn(`⚠️ Invalid or incomplete structure in module${id}.json:`, moduleData);
      alert(`⚠️ Module ${id} data is invalid. Please check your JSON structure.`);
      return null;
    }

    return moduleData as Module;
  } catch (err) {
    console.error(`❌ Failed to load module${id}.json:`, err);
    alert(`⚠️ Could not load Module ${id}.json. Check your /data/modules folder.`);
    return null;
  }
};

/**
 * ✅ Ensures candidate state is valid and initialized
 */
const safeInitState = (office: "President" | "Senate" | "House"): CandidateState => {
  const base = initCandidateState(office);
  return {
    cc: 0,
    signatures: 0,
    approval: 0,
    currentModuleId: "0",
    office,
    ...base,
  };
};

/**
 * ✅ Safely applies state updates after a module runs
 */
const safeRunModule = (module: Module, state: CandidateState): CandidateState => {
  try {
    const updated = runModule(module, state);
    if (!updated || typeof updated !== "object") throw new Error("runModule returned invalid state");
    return {
      ...state,
      ...updated,
      cc: updated.cc ?? state.cc,
      signatures: updated.signatures ?? state.signatures,
      approval: updated.approval ?? state.approval,
    };
  } catch (err) {
    console.error("❌ Error running module:", err);
    alert("⚠️ Something went wrong while processing this module. Continuing with last valid state.");
    return state;
  }
};

const ChatSimulator: React.FC = () => {
  const [candidateState, setCandidateState] = useState<CandidateState | null>(null);
  const [currentModule, setCurrentModule] = useState<Module | null>(null);
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState("");
  const [office, setOffice] = useState<"President" | "Senate" | "House" | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // 🎙 Initial welcome messages
  useEffect(() => {
    setMessages([
      "🎙️ Welcome to the Federal Candidate Simulator — AI Edition.",
      "Type the office you want to run for: President, Senate, or House.",
    ]);
  }, []);

  /**
   * ✅ Handles user input safely (with office selection & module flow)
   */
  const handleUserInput = async () => {
    if (!input.trim()) return;

    setMessages((prev) => [...prev, `🗣️ You: ${input}`]);
    setIsLoading(true);

    try {
      // 🏛 Office selection
      if (!office) {
        const choice = input.trim().toLowerCase();
        const selected =
          choice === "president"
            ? "President"
            : choice === "senate"
            ? "Senate"
            : choice === "house"
            ? "House"
            : null;

        if (!selected) {
          setMessages((prev) => [...prev, "❌ Please choose: President, Senate, or House."]);
          setInput("");
          setIsLoading(false);
          return;
        }

        setOffice(selected);
        const initState = safeInitState(selected);
        setCandidateState(initState);

        const mod = await loadModule("1");
        if (mod) {
          setCurrentModule(mod);
          setMessages((prev) => [
            ...prev,
            `🏛️ You’ve chosen to run for ${selected}.`,
            `🎯 Starting ${mod.title}...`,
          ]);
        } else {
          setMessages((prev) => [
            ...prev,
            `⚠️ Could not load Module 1. Please check your data folder.`,
          ]);
        }

        setInput("");
        setIsLoading(false);
        return;
      }

      // 📊 Module progression
      if (currentModule && candidateState) {
        const updatedState = safeRunModule(currentModule, candidateState);
        const nextId = (parseInt(currentModule.id) + 1).toString();
        const nextModule = await loadModule(nextId);

        setCandidateState({
          ...updatedState,
          currentModuleId: nextId,
        });

        setMessages((prev) => [
          ...prev,
          `📊 Module ${currentModule.id} complete! CC: ${updatedState.cc}, Signatures: ${updatedState.signatures}, Approval: ${updatedState.approval}%`,
          nextModule ? `➡️ Moving to ${nextModule.title}...` : "🏁 Simulation complete!",
        ]);

        setCurrentModule(nextModule || null);
        setInput("");
        setIsLoading(false);
      }
    } catch (err) {
      console.error("❌ Unexpected error in user input handler:", err);
      alert("⚠️ An unexpected error occurred. Simulation will continue.");
      setIsLoading(false);
    }
  };

  return (
    <div className="p-4 max-w-3xl mx-auto bg-white/90 rounded-2xl shadow-md border border-gray-200">
      <h2 className="text-2xl font-bold mb-4 text-center">🗳️ Federal Candidate Simulator</h2>

      <div className="h-[400px] overflow-y-auto p-3 border rounded-md bg-gray-50 mb-4">
        {messages.map((msg, i) => (
          <div key={i} className="mb-2 whitespace-pre-wrap">
            {msg}
          </div>
        ))}
        {isLoading && <div className="text-gray-500 italic">AI is thinking...</div>}
      </div>

      <div className="flex space-x-2">
        <input
          type="text"
          className="flex-1 border rounded-md p-2"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleUserInput()}
          placeholder="Type your response..."
        />
        <button
          onClick={handleUserInput}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
          disabled={isLoading}
        >
          Send
        </button>
      </div>

      {currentModule && candidateState && (
        <ModuleDisplay
          module={currentModule}
          candidateState={candidateState}
          setCandidateState={setCandidateState}
        />
      )}
    </div>
  );
};

export default ChatSimulator;
