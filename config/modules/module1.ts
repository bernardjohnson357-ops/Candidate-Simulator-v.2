// config/modules/module1.ts
import { Module } from "@/app/ai/types";

export const module1: Module = {
  id: "1",
  title: "📜 Module 1 – Filing Requirements",
  description: `Every federal candidate must file with the FEC.
You’ll need to register, disclose financials, and meet signature requirements.`,
  tasks: [
    {
      id: "1-1",
      type: "read",
      prompt: "Read about filing requirements and candidate eligibility.",
    },
    {
      id: "1-2",
      type: "choice",
      prompt: "Do you want to continue to filing?",
      options: ["✅ Yes", "❌ No"],
    },
  ],
};
