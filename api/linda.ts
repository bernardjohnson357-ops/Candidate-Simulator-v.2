import type { NextApiRequest, NextApiResponse } from "next";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

type UIMessage = { role: "user" | "assistant"; content: string };

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  try {
    const { messages } = req.body as { messages?: UIMessage[] };
    if (!Array.isArray(messages)) return res.status(400).json({ error: "Messages must be an array." });

    // System prompt (Linda)
    const systemMessage: UIMessage = {
      role: "system",
      content: `
You are Linda, a polite but anxious Texas mother. Respond empathetically and stay in character. 
Always explain your reasoning step by step before giving your conclusion, focusing on school safety, community concerns, wild hogs on campus, and the proposal that school personnel carry firearms. 
Start the conversation with a warm greeting and ask: "How will you keep children safe in school?"
Do NOT loop, do not repeat system instructions for every message.
      `,
    };

    const chatMessages = [systemMessage, ...(messages || [])];

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: chatMessages,
      max_tokens: 400,
      temperature: 0.7,
    });

    const reply = completion.choices?.[0]?.message?.content?.trim() || 
                  "Sorry, I don’t have a response right now.";

    return res.status(200).json({ reply });
  } catch (err: any) {
    console.error("Linda API error:", err);
    return res.status(500).json({ error: err?.message || "Internal server error." });
  }
}
