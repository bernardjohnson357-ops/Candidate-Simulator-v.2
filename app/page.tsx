// app/page.tsx
"use client";

import React, { useState } from "react";
import ModuleDisplay from "../components/ModuleDisplay";
import modulesData from "../data/modules.json"; // wherever your modules JSON is

const SimulatorPage: React.FC = () => {
  const [currentModuleIndex, setCurrentModuleIndex] = useState(0);

  const handleTaskComplete = (taskIndex: number, response: string) => {
    console.log(`Task ${taskIndex} completed with response: ${response}`);
    // update CC, voter approval, etc.
  };

  return (
    <ModuleDisplay
      module={modulesData[currentModuleIndex]}
      onTaskComplete={handleTaskComplete}
    />
  );
};

export default SimulatorPage;
