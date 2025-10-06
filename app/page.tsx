// ./app/page.tsx
"use client";

import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import { Module, Task } from "@/app/ai/types";
import { allModules } from "@/app/config/modules";

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
    <div style={{ padding: "2rem", maxWidth: "900px", margin: "auto" }}>
      <h1>Federal Candidate Simulator</h1>

      {/* Module selector */}
      <select value={currentModule.id} onChange={handleSelectChange}>
        {allModules.map((mod) => (
          <option key={mod.id} value={mod.id}>
            {mod.title}
          </option>
        ))}
      </select>

      {/* Prev / Next buttons */}
      <div style={{ margin: "1rem 0" }}>
        <button onClick={handlePrev} disabled={currentIndex === 0}>
          Previous
        </button>
        <button
          onClick={handleNext}
          disabled={currentIndex === allModules.length - 1}
          style={{ marginLeft: "1rem" }}
        >
          Next
        </button>
      </div>

      {/* Module content */}
      <div style={{ marginTop: "2rem" }}>
        <h2>{currentModule.title}</h2>

        {/* Markdown description */}
        {currentModule.description && (
          <ReactMarkdown>{currentModule.description}</ReactMarkdown>
        )}

        {/* Tasks */}
        {currentModule.tasks && currentModule.tasks.length > 0 && (
          <div>
            <h3>Tasks</h3>
            <ul>
              {currentModule.tasks.map((task: Task) => (
                <li key={task.id} style={{ marginBottom: "1rem" }}>
                  <strong>{task.type.toUpperCase()}:</strong> {task.prompt}

                  {/* Quiz questions */}
                  {task.questions && task.questions.length > 0 && (
                    <ul style={{ marginTop: "0.5rem" }}>
                      {task.questions.map((q, idx) => (
                        <li key={idx}>
                          {q.question}
                          <ul>
                            {q.options.map((opt, oIdx) => (
                              <li key={oIdx}>{opt}</li>
                            ))}
                          </ul>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
