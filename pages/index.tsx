import { useState } from "react";

const modules = [
  "Module 1: Filing Process",
  "Module 2: Additional Compliance Quizzes",
  "Module 3: General Election Preparation",
  "Module 4: Announcement & Identity",
  "Module 5: Merchandising & Decision-Making",
  "Module 6: FEC Filing & Constituent Scenarios",
  "Module 7: October/Election Run-Up",
];

export default function Home() {
  const [currentModule, setCurrentModule] = useState<number | null>(null);

  return (
    <main className="min-h-screen flex flex-col justify-center items-center bg-yellow-400 p-4">
      <h1 className="text-4xl font-bold text-center mb-6">
        Candidate Simulator AI
      </h1>

      {currentModule === null ? (
        <div className="flex flex-col gap-4">
          {modules.map((mod, index) => (
            <button
              key={index}
              className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700"
              onClick={() => setCurrentModule(index)}
            >
              {mod}
            </button>
          ))}
        </div>
      ) : (
        <div className="w-full max-w-xl bg-white p-6 rounded shadow">
          <h2 className="text-2xl font-semibold mb-4">
            {modules[currentModule]}
          </h2>
          <p>Module content and GPT interaction will appear here.</p>
          <button
            className="mt-4 px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
            onClick={() => setCurrentModule(null)}
          >
            Back to Modules
          </button>
        </div>
      )}
    </main>
  );
}
