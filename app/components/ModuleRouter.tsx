import { useGameState } from "@/context/GameStateContext";
import { DynamicQuiz } from "./DynamicQuiz";
import { DynamicModule2Quiz } from "./DynamicModule2Quiz";
import GeneralElection from "./GeneralElection";

export default function ModuleRouter() {
  const { currentModule, branch } = useGameState();

  const module1RefText = "Insert Module 1 reference text here...";
  const module2RefText = "Insert Module 2 reference text here...";

  if ((currentModule === "1A" || currentModule === "1B") && branch) {
    return <DynamicQuiz branch={branch} moduleRefText={module1RefText} />;
  }

  if (currentModule === "2A" || currentModule === "2B") {
    return <DynamicModule2Quiz branch={currentModule} moduleRefText={module2RefText} />;
  }

  if (currentModule === "GeneralElection") {
    return <GeneralElection />;
  }

  return <div>Select a branch to start the campaign.</div>;
}
