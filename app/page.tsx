// ./app/page.tsx
"use client";

import React, { useState } from "react";
import { Module } from "@/app/ai/types";

import module0Json from "@/app/data/modules/module0.json";
import module1Json from "@/app/data/modules/module1.json";
import module2Json from "@/app/data/modules/module2.json";
import module3Json from "@/app/data/modules/module3.json";
import module4Json from "@/app/data/modules/module4.json";
import module5Json from "@/app/data/modules/module5.json";
import module6Json from "@/app/data/modules/module6.json";
import module7Json from "@/app/data/modules/module7.json";
import module8Json from "@/app/data/modules/module8.json";
import module9Json from "@/app/data/modules/module9.json";
import module10Json from "@/app/data/modules/module10.json";
import module11Json from "@/app/data/modules/module11.json";
import module12Json from "@/app/data/modules/module12.json";
import module13Json from "@/app/data/modules/module13.json";
import module14Json from "@/app/data/modules/module14.json";
import module15Json from "@/app/data/modules/module15.json";

export const allModules: Module[] = [
  module0Json as unknown as Module,
  module1Json as unknown as Module,
  module2Json as unknown as Module,
  module3Json as unknown as Module,
  module4Json as unknown as Module,
  module5Json as unknown as Module,
  module6Json as unknown as Module,
  module7Json as unknown as Module,
  module8Json as unknown as Module,
  module9Json as unknown as Module,
  module10Json as unknown as Module,
  module11Json as unknown as Module,
  module12Json as unknown as Module,
  module13Json as unknown as Module,
  module14Json as unknown as Module,
  module15Json as unknown as Module,
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
