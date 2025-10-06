// ./app/page.tsx
"use client";

import React, { useState } from "react";
import module0 from "@/app/data/modules/module0.json";
import module1 from "@/app/data/modules/module1.json";
// ... import all modules up to module15
import module15 from "@/app/data/modules/module15.json";
import ReactMarkdown from "react-markdown";

import { Module, CandidateState } from "@/app/ai/types";

// put all modules in an array
const allModules: Module[] = [
  module0,
  module1,
  // ... up to
  module15,
];

export default function HomePage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [candidateState, setCandidateState] = useState<CandidateState | null>(null);

  const currentModule = allModules[currentIndex];

  const handleNext = () => {
    if (currentIndex < allModules.length - 1) setCurrentIndex(currentIndex + 1);
  };

  const handlePrev = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const index = allModules.findIndex((m) => m.id === e.target.value);
    if (index !== -1) setCurrentIndex(index);
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">{currentModule.title}</h1>

      {/* Module selection dropdown */}
      <select
        value={currentModule.id}
        onChange={handleSelectChange}
        className="border p-2 mb-4 w-full"
      >
        {allModules.map((m) => (
          <option key={m.id} value={m.id}>
            {m.title}
          </option>
        ))}
      </select>

      {/* Module description/content */}
      {currentModule.description && (
        <div className="mb-4 prose max-w-none">
          <ReactMarkdown>{currentModule.description}</ReactMarkdown>
        </div>
      )}

      {/* Tasks */}
      <div className="mb-4">
        {currentModule.tasks.map((task) => (
          <div key={task.id} className="border p-3 mb-2 rounded">
            <p className="font-semibold">Task: {task.prompt}</p>
            {task.questions && (
              <ul className="list-disc ml-6">
                {task.questions.map((q, i) => (
                  <li key={i}>
                    {q.question}
                    <ul className="list-disc ml-6">
                      {q.options.map((opt, j) => (
                        <li key={j}>{opt}</li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>

      {/* Navigation buttons */}
      <div className="flex justify-between">
        <button
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <button
          onClick={handleNext}
          disabled={currentIndex === allModules.length - 1}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}
