// app/page.tsx
"use client";

import ChatSimulator from "./components/ChatSimulator";

export default function HomePage() {
  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold mb-4">Candidate Simulator</h1>
      <ChatSimulator />
    </main>
  );
}
