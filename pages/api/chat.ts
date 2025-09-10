import type { NextApiRequest, NextApiResponse } from "next";
import OpenAI from "openai";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

type Message = { type: "user" | "ai"; content: string };

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { messages } = req.body as { messages: Message[] };

  if (!messages) return res.status(400).json({ error: "No messages provided" });

  try {
    const chatMessages = [
      {
        role: "system",
        content: "You are the Candidate Simulator AI, guiding candidates through federal campaigns.",
      },
      ...messages.map((m) => ({ role: m.type === "user" ? "user" : "assistant", content: m.content })),
    ];

    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: chatMessages,
    });

    const reply = completion.choices[0].message?.content || "No response from AI.";
    res.status(200).json({ reply });
  } catch (err) {
    res.status(500).json({ error: "OpenAI error" });
  }
}
