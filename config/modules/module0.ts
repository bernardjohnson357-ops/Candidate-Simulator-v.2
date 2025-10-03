// config/modules/module0.ts
import { Module } from "@/app/ai/types";

export const module0: Module = {
  id: "0",
  title: "🗳 Module 0 – Orientation & Introduction",
  description: `Welcome to the Federal Candidate Simulator — AI Edition.
This simulator will take you through the election cycle step by step.
You’ll experience filing, fundraising, compliance, and campaigning.`,
  tasks: [
    {
      id: "0-1",
      type: "choice",
      prompt: "Which office will you run for?",
      options: ["🏛 President", "🏛 Senate", "🏛 House"],
    },
  ],
};
