// pages/api/simulator.ts
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
    const { messages } = req.body; // expects { messages: [{ role: "user", content: "..." }] }

    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini", // or your custom GPT model name
      messages,
    });

    res.status(200).json({
      reply: completion.choices[0].message,
    });
  } catch (error: any) {
    console.error("OpenAI API error:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
}
