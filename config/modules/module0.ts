// ./config/modules/module0.ts
// config/modules/module0.ts
import { Module } from "@/app/ai/types";

export const module0: Module = {
  id: "0",
  title: "Orientation & Introduction",
  description: `
# 🗳 Module 0 – Orientation & Introduction
**Narrator [calm, professional]:** "Welcome to the Federal Candidate Simulator — AI Edition..."
  `,
  tasks: [
    {
      id: "0-quiz-1",
      type: "quiz",
      prompt: "Quiz: What does 1 Candidate Coin (CC) represent?",
      questions: [
        {
          question: "What does 1 CC equal in simulated campaign funds?",
          options: [
            "A) $10",
            "B) $100 ✅",
            "C) $1,000",
            "D) $10,000"
          ],
          correct: 1, // index of the right answer (0-based)
        },
      ],
    },
  ],
};
