import { useState } from "react";
import Head from "next/head";

export default function Home() {
  const [coins, setCoins] = useState(0);

  const modules = [
    "Module 1: Filing Process",
    "Module 2: Compliance Quizzes",
    "Module 3: General Election Prep",
    "Module 4: Announcement & Identity",
    "Module 5: Merchandising & Decisions",
    "Module 6: FEC & Constituents",
    "Module 7: Election Run-Up",
  ];

  return (
    <>
      <Head>
        <title>Candidate Simulator AI</title>
        <meta
          name="description"
          content="Candidate Simulator AI - Practice running for office step by step"
        />
      </Head>

      <main className="min-h-screen flex flex-col items-center justify-center bg-yellow-400 p-6">
        {/* Header */}
        <h1 className="text-3xl md:text-5xl font-bold mb-6 text-center">
          Welcome to Candidate Simulator AI
        </h1>

        {/* Candidate Coins */}
        <div className="mb-6 bg-white rounded-2xl shadow px-6 py-3 flex items-center space-x-4">
          <span className="text-lg font-semibold">Candidate Coins:</span>
          <span className="text-2xl font-bold text-green-600">{coins}</span>
          <button
            onClick={() => setCoins(coins + 1)}
            className="px-4 py-2 bg-green-500 text-white rounded-xl hover:bg-green-600"
          >
            +1
          </button>
        </div>

        {/* Module Navigation */}
        <div className="grid gap-4 w-full max-w-xl">
          {modules.map((module, idx) => (
            <button
              key={idx}
              className="w-full px-4 py-3 bg-white rounded-2xl shadow hover:bg-gray-100 text-lg font-medium"
            >
              {module}
            </button>
          ))}
        </div>

        {/* Footer */}
        <p className="mt-10 text-sm text-gray-700 text-center">
          Designed for iframe embedding on NationBuilder.
        </p>
      </main>
    </>
  );
}
