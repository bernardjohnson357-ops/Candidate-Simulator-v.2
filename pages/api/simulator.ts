// pages/api/simulator.ts
import type { NextApiRequest, NextApiResponse } from "next";
import OpenAI from "openai";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });

type Message = {
  role: "user" | "assistant" | "system";
  content: string;
};

type Module = {
  id: number;
  title: string;
  description: string;
  links?: string[];
};

const modules: Module[] = [
  { id: 0, title: "Introduction", description: "Purpose: Educate candidates using reading, writing, and AI-interactive tasks." },
  { id: 1, title: "Module 1A - Independent Filing", description: "Earn Candidate Coins via quizzes." },
  { id: 7, title: "October Modules", description: "Voice and speech practice unlocked." },
  // ...add other modules as needed
];

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { messages, currentModule = 0, candidateCoins = 50 } = req.body as {
    messages: Message[];
    currentModule?: number;
    candidateCoins?: number;
  };

  if (!messages || !Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: "No messages provided" });
  }

  try {
    const moduleContext = modules.find((m) => m.id === currentModule);

    // Add system message with module context
    const openAIMessages = [
      { role: "system", content: `You are a campaign simulator assistant. Candidate has ${candidateCoins} Candidate Coins. Module context: ${moduleContext?.description}` },
      ...messages,
    ];

    const completion = await client.chat.completions.create({
      model: "gpt-4",
      messages: openAIMessages,
      temperature: 0.7,
    });

    const output = completion.choices?.[0]?.message?.content ?? "⚠️ No response from model.";

    return res.status(200).json({ output });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
}
