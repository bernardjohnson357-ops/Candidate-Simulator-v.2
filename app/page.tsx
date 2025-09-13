// app/page.tsx
"use client";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-6 text-center">
      <h1 className="text-4xl font-bold">Candidate Simulator</h1>
      <p className="text-lg">
        Welcome! Click below to begin the Candidate Simulator Orientation.
      </p>

      <button
        onClick={() => router.push("/module0")}
        className="mt-6 px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Start Orientation
      </button>
    </div>
  );
}
