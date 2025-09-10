// /pages/api/chat.ts
import type { NextApiRequest, NextApiResponse } from "next";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Make sure you set this in your environment
});

type Message = {
  type: "user" | "ai" | "image";
  content: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { messages }: { messages: Message[] } = req.body;

  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: "Invalid request body" });
  }

  try {
    // Convert messages to GPT chat format
    const chatMessages = messages
      .filter((m) => m.type === "user" || m.type === "ai")
      .map((m) => ({
        role: m.type === "user" ? "user" : "assistant",
        content: m.content,
      }));

    // Add system prompt for candidate simulator context
    chatMessages.unshift({
      role: "system",
      content: "You are a helpful AI assistant for a federal candidate simulator. Respond as if guiding the candidate through campaign decisions.",
    });

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini", // Can change to gpt-4 or other models
      messages: chatMessages,
      temperature: 0.7,
    });

    const reply = completion.choices[0].message?.content || "I'm not sure how to respond.";

    res.status(200).json({ reply });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to get response from AI." });
  }
}
