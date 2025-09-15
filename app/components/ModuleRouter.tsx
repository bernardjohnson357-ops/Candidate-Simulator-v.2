"use client";

import { useGameState } from "@/context/GameStateContext";
import { DynamicQuiz } from "./DynamicQuiz";
import { DynamicModule2Quiz } from "./DynamicModule2Quiz";
import GeneralElection from "./GeneralElection";

export default function ModuleRouter() {
  const { currentModule, branch } = useGameState();

  const moduleRefs: Record<string,string> = {
    "1A": "Module 1A reference text...",
    "1B": "Module 1B reference text...",
    "2A": "Module 2A reference text...",
    "2B": "Module 2B reference text...",
    "3": "Module 3 reference text...",
    "4": "Module 4 reference text...",
    // ...add 5-15
  };

  // Orientation
  if (currentModule === "0") return <div>Module 0 – Orientation</div>;

  // Module 1
  if ((currentModule === "1A" || currentModule === "1B") && branch) {
    return <DynamicQuiz branch={branch} moduleRefText={moduleRefs[currentModule]} />;
  }

  // Module 2
  if (currentModule === "2A" || currentModule === "2B") {
    return <DynamicModule2Quiz branch={currentModule} moduleRefText={moduleRefs[currentModule]} />;
  }

  // Modules 3–15
  if (["3","4","5","6","7","8","9","10","11","12","13","14","15"].includes(currentModule)) {
    return <div>Module {currentModule} – Coming Soon</div>;
  }

  // General Election
  if (currentModule === "GeneralElection") return <GeneralElection />;

  return <div>Select a branch to start the campaign</div>;
}
