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
    const { messages } = req.body;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: "You are Linda, a concerned parent at a town hall. Speak directly to the candidate in a realistic way, with warmth but also skepticism. Push for details on school safety, mental health, and accountability.",
        },
        ...messages, // include ALL conversation turns
      ],
      temperature: 0.8,
    });

    const reply = completion.choices[0].message?.content ?? "Sorry, I didn’t catch that.";

    res.status(200).json({ reply });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
}
