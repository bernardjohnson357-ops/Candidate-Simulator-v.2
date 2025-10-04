// ./config/modules/module0.ts
import { Module } from "@/app/ai/types";

export const module0: Module = {
  id: "0",
  title: "Orientation & Introduction",
  description: `
Welcome to the Federal Candidate Simulator — AI Edition.
This simulator will take you through the election cycle, step by step.
You’ll experience filing, fundraising, compliance, and campaigning — safely in a simulation.
`,
  tasks: [
    {
      id: "0-quiz-1",
      type: "quiz",
      prompt: "Quiz: What does 1 Candidate Coin (CC) represent?",
    },
    {
      id: "0-choice-1",
      type: "write",
      prompt: "Type which office you want to run for: President, Senate, or House.",
    },
  ],
};
