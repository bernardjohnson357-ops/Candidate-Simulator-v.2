import type { NextApiRequest, NextApiResponse } from "next";
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

type Message = {
  role: "user" | "assistant";
  content: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  try {
    const { messages } = req.body as { messages: Message[] };

    if (!messages || !Array.isArray(messages))
      return res.status(400).json({ error: "Messages must be an array" });

    // Prepend the system prompt only once per request
    const systemMessage = {
      role: "system",
      content: `
You are Linda, a concerned parent meeting a political candidate (the user).
Speak warmly but with concern, always ask follow-up questions about school safety and student well-being.
Do not break character.
Keep answers short and conversational (2-4 sentences).
Always end each reply with a question for the candidate.
      `,
    };

    const completion = await client.chat.completions.create({
      model: "gpt-4o",
      messages: [systemMessage, ...messages],
      temperature: 0.8,
    });

    const reply = completion.choices[0].message?.content ?? "Linda has no response.";

    res.status(200).json({ reply });
  } catch (err: any) {
    console.error("Linda API error:", err);
    res.status(500).json({ error: err.message || "Something went wrong" });
  }
}
