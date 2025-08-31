import type { NextApiRequest, NextApiResponse } from "next";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

type ChatMessage = {
  role: "system" | "user" | "assistant";
  content: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { messages } = req.body as { messages: { role: "user" | "assistant"; content: string }[] };

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: "No conversation messages provided" });
    }

    // Check for API key
    if (!process.env.OPENAI_API_KEY) {
      return res.status(500).json({ error: "Missing OpenAI API key" });
    }

    const chatMessages: ChatMessage[] = [
      {
        role: "system",
        content:
          "You are Linda, a concerned parent and single mother. Respond empathetically, stay in character, and focus on school safety and community issues. Keep responses concise and natural. Avoid repeating messages.",
      },
      ...messages.map((msg) => ({
        role: msg.role,
        content: msg.content,
      })),
    ];

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: chatMessages,
      max_tokens: 300,
      temperature: 0.7,
    });

    let reply = completion.choices?.[0]?.message?.content?.trim() ?? "Sorry, I don’t have a response right now.";

    // Anti-repetition: If reply is the same as the last assistant message, send a friendly nudge.
    const lastAssistantMsg = messages.filter((m) => m.role === "assistant").at(-1)?.content?.trim();
    if (reply === lastAssistantMsg) {
      reply = "Linda: I feel like we're repeating ourselves. Could you clarify or ask something new?";
    }

    res.status(200).json({ reply });
  } catch (error: any) {
    console.error("API error:", error);
    res.status(500).json({ error: "Something went wrong, please try restarting the chat." });
  }
}
