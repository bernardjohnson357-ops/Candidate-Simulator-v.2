// ./app/page.tsx
"use client";
import React, { useState, useEffect } from "react";
import CandidateSimulator from "./components/CandidateSimulator";

const HomePage: React.FC = () => {
  return (
    <main style={{ padding: 20 }}>
      <h1>Federal Candidate Simulator</h1>
      <p>
        Welcome! You’ll progress through all modules automatically. Typing is preferred until Module 7; you may also speak or upload images at any time.
      </p>

      {/* Render the simulator */}
      <CandidateSimulator />
    </main>
  );
};

export default HomePage;
