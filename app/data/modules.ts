import { Module } from "@/app/ai/types";

export const modules: Module[] = [
  {
    id: "module0",
    title: "Orientation & Introduction",
    description: "Introduction to the Federal Candidate Simulator and how it works.",
    readingSummary: [
      "Candidate Coins (CC) represent campaign resources, not real money.",
      "Signatures show grassroots voter support.",
      "Each decision you make affects CC, signatures, and voter approval."
    ],
    purpose: "Help candidates understand simulator mechanics before campaign mode.",
    tasks: [
      {
        id: "read0",
        type: "read",
        prompt: "📘 Read the simulator rules carefully. Understanding CC, signatures, and ballot access is crucial."
      },
      {
        id: "q1",
        type: "quiz",
        prompt: "🧩 What do Candidate Coins (CC) represent in this simulator?",
        questions: [
          {
            question: "What do Candidate Coins (CC) represent?",
            options: [
              "A) 1 CC = $100 simulated",
              "B) Real currency for campaign ads",
              "C) Signatures collected from voters",
              "D) Debate score multiplier"
            ],
            correct: "A) 1 CC = $100 simulated"
          }
        ]
      }
    ],
    nextModule: { id: "module1", title: "Ballot Access & Strategy" }
  },

  {
    id: "module1",
    title: "Ballot Access & Strategy",
    description:
      "Learn how signatures, fundraising, and CC affect your ability to get on the ballot.",
    tasks: [
      {
        id: "read1",
        type: "read",
        prompt: "📘 Different offices have different ballot requirements. Gather signatures and manage resources wisely."
      }
    ]
  }
];
