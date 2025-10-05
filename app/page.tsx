// ./app/page.tsx
"use client";

import React, { useState } from "react";
import ModuleDisplay from "@/app/components/ModuleDisplay";
import { Module } from "@/app/ai/types";

// Import all JSON modules
import module0 from "@/app/data/modules/module0.json";
import module1 from "@/app/data/modules/module1.json";
// Add more as needed: import module2 from "@/app/data/modules/module2.json";

// Cast to Module[]
const allModules: Module[] = [module0 as Module, module1 as Module];

export default function HomePage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentModule = allModules[currentIndex];

  const handleNext = () => {
    if (currentIndex < allModules.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const index = allModules.findIndex((m) => m.id === e.target.value);
    if (index !== -1) setCurrentIndex(index);
  };

  return (
    <main className="p-6 max-w-4xl mx-auto bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center">
        🗳️ Federal Candidate Simulator — Module Viewer
      </h1>

      {/* Dropdown selector */}
      <div className="flex justify-center mb-6 gap-4">
        <button
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className={`px-4 py-2 rounded-md text-white ${
            currentIndex === 0
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          ⬅️ Previous
        </button>

        <select
          className="border border-gray-300 rounded-md p-2 text-lg"
          value={currentModule.id}
          onChange={handleSelectChange}
        >
          {allModules.map((m) => (
            <option key={m.id} value={m.id}>
              {m.title}
            </option>
          ))}
        </select>

        <button
          onClick={handleNext}
          disabled={currentIndex === allModules.length - 1}
          className={`px-4 py-2 rounded-md text-white ${
            currentIndex === allModules.length - 1
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          Next ➡️
        </button>
      </div>

      {/* Display selected module */}
      <ModuleDisplay module={currentModule} />
    </main>
  );
}
