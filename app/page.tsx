// app/page.tsx
"use client";
import ChatSimulator from "@/components/ChatSimulator";

export default function HomePage() {
  return (
    <div className="p-8 max-w-4xl mx-auto space-y-6">
      <h1 className="text-4xl font-bold text-center">Candidate Simulator</h1>
      <p className="text-lg text-center">
        Welcome to the Candidate Simulator. Your orientation will begin now.
      </p>

      {/* Chat-driven simulator starts immediately */}
      <ChatSimulator />
    </div>
  );
}
