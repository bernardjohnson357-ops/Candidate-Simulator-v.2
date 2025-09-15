// app/components/ChatSimulator.tsx
"use client";

import { useState } from "react";
import ModuleRouter from "./ModuleRouter";

export default function ChatSimulator() {
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Federal Candidate Simulator</h2>
      <ModuleRouter />
    </div>
  );
}
