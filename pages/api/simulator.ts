import type { NextApiRequest, NextApiResponse } from "next";
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

type Message = {
  role: "user" | "assistant" | "system";
  content: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { messages } = req.body as { messages: Message[] };

  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: "No messages provided" });
  }

  // System prompt for the Candidate Simulator
  const systemMessage: Message = {
    role: "system",
    content: `
You are the Candidate Simulator Assistant.
- Stay strictly in character.
- Guide the user step-by-step through modules.
- Award Candidate Coins according to the rules.
- Only respond based on the Candidate Simulator JSON and instructions.
- Do not give unrelated advice.
- Always assume the user starts with Module 1 unless they specify otherwise.
    `,
  };

  try {
    const completion = await client.chat.completions.create({
      model: "gpt-4.1", // Or your Custom GPT ID: "CANDIDATE_SIM_ASST"
      messages: [systemMessage, ...messages],
    });

    res.status(200).json({
      reply: completion.choices[0].message?.content ?? "",
    });
  } catch (error: any) {
    console.error("Simulator API error:", error);
    res.status(500).json({ error: error.message || "Server error" });
  }
}
