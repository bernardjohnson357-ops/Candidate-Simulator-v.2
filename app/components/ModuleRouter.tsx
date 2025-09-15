// components/ModuleRouter.tsx
import { useGameState } from "@/context/GameStateContext";
import { DynamicQuiz } from "./DynamicQuiz";
import { DynamicModule2Quiz } from "./DynamicModule2Quiz";
import { GeneralElection } from "@/components/GeneralElection";

export default function ModuleRouter() {
  const { currentModule, branch } = useGameState();

  if (currentModule === "1" && branch) {
    return <DynamicQuiz branch={branch} />;
  }

  if (currentModule === "2" && branch) {
    // Map Module 1A → 2A, Module 1B → 2B
    const module2Branch = branch === "1A" ? "2A" : "2B";
    return <DynamicModule2Quiz branch={module2Branch} />;
  }

  if (currentModule === "GeneralElection") {
    return <GeneralElection />;
  }

  // Show branch selection if none chosen yet
  return null;
}
