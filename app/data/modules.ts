import { Module } from "@/app/ai/types";

export const modules: Module[] = [
{
  id: "module0",
  title: "Orientation & Introduction",
  description: "Introduction to the Federal Candidate Simulator and how it works.",
  tasks: [
    {
      id: "t1",
      type: "read",
      prompt: "📘 Read the simulator rules carefully. Understanding CC, signatures, and ballot access is crucial."
    },
    {
      id: "t2",
      type: "quiz",
      prompt: "🧩 What do Candidate Coins (CC) represent in this simulator?",
      questions: [
        {
          id: "q1",
          question: "What do Candidate Coins (CC) represent?",
          options: [
            "A) 1 CC = $100 simulated",
            "B) 1 CC = 1 signature",
            "C) 1 CC = voter approval percentage"
          ],
          correct: "A) 1 CC = $100 simulated"
        }
      ]
    }
  ],
  nextModule: { id: "module1", title: "Ballot Access & Strategy" }
}

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
