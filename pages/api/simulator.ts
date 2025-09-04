import type { NextApiRequest, NextApiResponse } from "next";
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // your API key goes here
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { messages } = req.body;

  if (!messages) {
    return res.status(400).json({ error: "No messages provided" });
  }

  try {
    const completion = await client.chat.completions.create({
      model: "CANDIDATE_SIM_ASST", // 👈 Your Custom GPT project key
      messages,
    });

    res.status(200).json({
      reply: completion.choices[0].message?.content ?? "",
    });
  } catch (error: any) {
    console.error("Simulator API error:", error);
    res.status(500).json({ error: error.message || "Server error" });
  }
}
