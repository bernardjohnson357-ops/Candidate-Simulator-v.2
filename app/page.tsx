// app/page.tsx
"use client";

import ChatSimulator from "@/components/ChatSimulator";

export default function HomePage() {
  return (
    <main style={{ padding: "2rem" }}>
      <h1>Federal Candidate Simulator</h1>
      <ChatSimulator />
    </main>
  );
}
