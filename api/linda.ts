console.log("Incoming messages:", req.body);

import type { NextApiRequest, NextApiResponse } from "next";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { messages } = req.body as { messages: { role: string; content: string }[] };

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: "No conversation messages provided" });
    }

    if (!process.env.OPENAI_API_KEY) {
      console.error("OPENAI_API_KEY missing");
      return res.status(500).json({ error: "OpenAI API key is missing in server environment." });
    }

    // Build conversation with Linda's system prompt
    const chatMessages = [
      {
        role: "system",
        content:
          "You are Linda, a concerned parent and single mother. Respond empathetically, stay in character, and focus on school safety and community issues. Keep responses concise and natural. Avoid repeating messages.",
      },
      ...messages.map((msg) => ({
        role: msg.role as "user" | "assistant" | "system",
        content: msg.content,
      })),
    ];

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: chatMessages,
      max_tokens: 300,
      temperature: 0.7,
    });

    const reply = completion.choices?.[0]?.message?.content ?? "Sorry, I don’t have a response right now.";

    res.status(200).json({ reply });
  } catch (error: any) {
    // Log deeper for debugging
    console.error("API error:", error?.response?.data || error);
    res.status(500).json({
      error:
        error?.response?.data?.error?.message ||
        error?.message ||
        "Something went wrong, please try restarting the chat.",
    });
  }
}
