import type { NextApiRequest, NextApiResponse } from "next";
import OpenAI from "openai";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

type Message = { role: string; content: string };
type ApiResponse = { reply?: Message; error?: string };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse>
) {
  // --- CORS headers ---
  const allowedOrigin = process.env.ALLOWED_ORIGIN || "*"; // You can set this to your NB domain in Vercel
  res.setHeader("Access-Control-Allow-Origin", allowedOrigin);
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // Handle preflight OPTIONS request
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { messages } = req.body as { messages: Message[] };

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: "Invalid messages format" });
    }

    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini", // Or your custom GPT
      messages,
    });

    res.status(200).json({ reply: completion.choices[0].message });
  } catch (error: any) {
    console.error("OpenAI API error:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
}
