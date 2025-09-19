// app/components/moduleProcessor.ts
import { getNextModule, processModuleInput } from "../ai/aiLoop";

export const runNext = () => {
  const module = getNextModule();
  if (!module) return "End of simulation.";
  return `${module.narrator}\n\n${module.prompt}`;
};

export const handleInput = (input: string) => {
  return processModuleInput(input);
};
