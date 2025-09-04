import type { NextApiRequest, NextApiResponse } from "next";
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

type Message = {
  role: "user" | "assistant" | "system";
  content: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { messages } = req.body as { messages: Message[] };
  if (!messages || !Array.isArray(messages)) return res.status(400).json({ error: "No messages provided" });

  // Full system prompt with Module 0 introduction and Candidate Coin references
  const systemMessage: Message = {
    role: "system",
    content: `
You are the Candidate Simulator Assistant – Federal Build.
Purpose: To educate prospective candidates—especially independents and third-party hopefuls—by simulating the real-world campaign process.
The Candidate Simulator is structured to challenge users with reading, writing, and interactive tasks. All user actions should be tracked for consistency.
All currency references use the term "Candidate Coin" instead of any previous terms.
Module 0: Introduction
- Introduce the Candidate Simulator.
- Explain purpose, Candidate Coins, quizzes, and simulations.
- Provide the user with a choice to run as:
   1) Independent candidate
   2) Libertarian Party candidate
- Ask the user to select the number of Candidate Coins to start with (0–100).
- Only respond based on the official simulator content and rules.
`
  };

  try {
    // If no user messages yet, give the welcome + Module 0 prompt
    const hasUserMessages = messages.some((m) => m.role === "user");
    if (!hasUserMessages) {
      return res.status(200).json({
        reply: `👋 Welcome to the Candidate Simulator – Federal Build!\n\nPlease choose your candidate path:\n1) Independent candidate\n2) Libertarian Party candidate\n\nAdditionally, select your starting Candidate Coins (0–100).`,
      });
    }

    // Otherwise, continue GPT conversation
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

// After Module 0 completion
if (currentModule === "module1a") {
  return res.status(200).json({
    reply: moduleReadings["module1a"],
  });
}
