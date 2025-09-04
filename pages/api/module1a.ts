import type { NextApiRequest, NextApiResponse } from "next";
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

type Message = {
  role: "user" | "assistant" | "system";
  content: string;
};

const moduleReadings: Record<string, string> = {
  module1a: `
Module 1A: Independent/Write-In Filing - Test Mode
Candidate Coins:
- Score 80%+ = 🪙 1 Candidate Coin
- Score 100% = 🪙🪙 2 Candidate Coins
Reference Materials:
- Texas SOS Independent Candidate Guide 2024: https://www.sos.state.tx.us/elections/candidates/guide/2024/ind2024.shtml
- Texas SOS Write-In Candidate Guide 2024: https://www.sos.state.tx.us/elections/candidates/guide/2024/writein2024.shtml
- FEC Guide for Congressional Candidates: https://www.fec.gov/resources/cms-content/documents/policy-guidance/candgui.pdf
Instructions:
Read the materials and complete quizzes. Each quiz score converts to signatures and Candidate Coins.
`,
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { messages, currentModule } = req.body as { messages: Message[]; currentModule?: string };
  if (!messages || !Array.isArray(messages)) return res.status(400).json({ error: "No messages provided" });

  const systemMessage: Message = {
    role: "system",
    content: `
You are the Candidate Simulator Assistant – Federal Build.
Purpose: Educate prospective candidates by simulating the real-world campaign process.
All currency references use the term "Candidate Coin".
Follow the official simulator content, modules, and scoring rules.
`,
  };

  try {
    const hasUserMessages = messages.some((m) => m.role === "user");

    // Module 0 welcome
    if (!hasUserMessages) {
      return res.status(200).json({
        reply: `👋 Welcome to the Candidate Simulator – Federal Build!\n\nPlease choose your candidate path:\n1) Independent candidate\n2) Libertarian Party candidate\n\nAdditionally, select your starting Candidate Coins (0–100).`,
      });
    }

    // Handle Module 1A
    if (currentModule === "module1a") {
      return res.status(200).json({
        reply: moduleReadings["module1a"],
      });
    }

    // Otherwise, forward conversation to GPT
    const completion = await client.chat.completions.create({
      model: "gpt-4.1",
      messages: [systemMessage, ...messages],
      temperature: 0.7,
    });

    res.status(200).json({
      reply: completion.choices[0].message?.content ?? "",
    });
  } catch (error: any) {
    console.error("Simulator API error:", error);
    res.status(500).json({ error: error.message || "Server error" });
  }
}
