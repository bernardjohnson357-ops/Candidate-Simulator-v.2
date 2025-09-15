"use client";

import { useGameState } from "@/context/GameStateContext";
import { DynamicQuiz } from "./DynamicQuiz";
import { DynamicModule2Quiz } from "./DynamicModule2Quiz";
import GeneralElection from "./GeneralElection";

export default function ModuleRouter() {
  const { currentModule, branch } = useGameState();

  // Module 0: Orientation
  if (currentModule === "0") return <div>Module 0 – Orientation</div>;

  // Module 1
  if ((currentModule === "1A" || currentModule === "1B") && branch) {
    return <DynamicQuiz branch={branch} moduleRefText="Module 1 reference text..." />;
  }

  // Module 2
  if (currentModule === "2A" || currentModule === "2B") {
    return <DynamicModule2Quiz branch={currentModule} moduleRefText="Module 2 reference text..." />;
  }

  // Modules 3–15 (placeholders)
  if (["3","4","5","6","7","8","9","10","11","12","13","14","15"].includes(currentModule)) {
    return <div>Module {currentModule} – Coming Soon</div>;
  }

  // General Election
  if (currentModule === "GeneralElection") return <GeneralElection />;

  return <div>Select a branch to start the campaign</div>;
}
