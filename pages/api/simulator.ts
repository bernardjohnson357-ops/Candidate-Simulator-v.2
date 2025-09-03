// pages/api/simulator.ts
import type { NextApiRequest, NextApiResponse } from "next";
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // --- CORS headers ---
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { messages } = req.body;

    if (!messages) {
      return res.status(400).json({ error: "Missing messages array" });
    }

    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages,
    });

    return res.status(200).json({
      reply: completion.choices[0].message,
    });
  } catch (err: any) {
    console.error("Error in /api/simulator:", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
