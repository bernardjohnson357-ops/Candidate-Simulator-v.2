import type { NextApiRequest, NextApiResponse } from "next";
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // make sure this is set in Vercel
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { messages } = req.body as {
      messages: { role: "user" | "assistant"; content: string }[];
    };

    // Always prepend a system instruction to lock Linda's persona
    const systemPrompt = {
      role: "system" as const,
      content:
        "You are Linda, a concerned parent speaking with a political candidate. " +
        "You are worried about school safety, local community issues, and want clear answers. " +
        "Stay empathetic and focused on the candidate’s policies. Do not role-shift.",
    };

    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini", // lighter, cheaper, and fast
      messages: [systemPrompt, ...messages],
      max_tokens: 300,
      temperature: 0.7,
    });

    const reply =
      completion.choices[0].message?.content ||
      "Sorry, I don’t have a response right now.";

    return res.status(200).json({ reply });
  } catch (error: any) {
    console.error("Linda API error:", error);
    return res.status(500).json({ error: "Something went wrong" });
  }
}
