// pages/api/simulator.ts
import type { NextApiRequest, NextApiResponse } from "next";
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { messages } = req.body;

    if (!messages) {
      return res.status(400).json({ error: "Missing messages in request body" });
    }

    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini", // swap in your custom GPT model if needed
      messages,
    });

    res.status(200).json({
      reply: completion.choices[0].message?.content ?? "",
    });
  } catch (error: any) {
    console.error("API error:", error);
    res.status(500).json({ error: error.message || "Server error" });
  }
}
