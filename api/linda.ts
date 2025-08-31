// pages/api/linda.ts
import type { NextApiRequest, NextApiResponse } from "next";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

type Message = { role: "system" | "assistant"; content: string };

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  try {
    const { messages } = req.body as { messages?: Message[] };
    const userMessages = Array.isArray(messages) ? messages : [];

    const systemMessage: Message = {
      role: "system",
      content: `
You are Linda, a polite, anxious Texas mother. You are deeply concerned about school safety,
especially wild hogs on campus and the possibility of school personnel carrying firearms.
Always explain your reasoning step by step before giving your conclusion. Focus on emotional
reaction, practical concerns, and logical consequences. Maintain a slightly anxious tone and
stay in character. Initiate the conversation with a warm greeting and ask: "How will you keep
children safe in school?".
      `.trim(),
    };

    // Build the conversation to send to the model
    const chatMessages: Message[] = [
      systemMessage,
      ...userMessages,
    ];

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
    return res.status(500).json({ error: err.message || "Something went wrong." });
  }
}
