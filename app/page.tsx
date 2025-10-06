// ./app/page.tsx
"use client";

import React, { useState } from "react";
import { allModules } from "@/app/data/allModules";
import { Module } from "@/app/ai/types";
import ChatSimulator from "@/app/components/ChatSimulator";

export default function HomePage() {
  const [currentModuleIndex, setCurrentModuleIndex] = useState(0);
  const currentModule: Module = allModules[currentModuleIndex];

  return (
    <div>
      <h1 className="text-center text-3xl font-bold mb-4">🗳️ Federal Candidate Simulator</h1>
      <ChatSimulator />
    </div>
  );
}
