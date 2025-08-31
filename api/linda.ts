import type { NextApiRequest, NextApiResponse } from "next";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

type Message = { role: "user" | "assistant"; content: string };

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  try {
    const { messages } = req.body as { messages: Message[] };
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: "No conversation messages provided" });
    }

    const systemMessage: Message = {
      role: "system",
      content:
        "You are Linda, a polite but anxious Texas mother. Respond empathetically and stay in character. Always explain your reasoning step by step before giving your conclusion, focusing on school safety and community concerns.",
    };

    const chatMessages = [systemMessage, ...messages];

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: chatMessages,
      max_tokens: 300,
      temperature: 0.7,
    });

    console.log("OpenAI response:", completion);

    const reply = completion.choices?.[0]?.message?.content?.trim() ?? 
                  "Sorry, I don’t have a response right now.";

    res.status(200).json({ reply });
  } catch (err: any) {
    console.error("API error:", err);
    res.status(500).json({ error: err.message || "Something went wrong." });
  }
}
