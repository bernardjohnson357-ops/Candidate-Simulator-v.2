import type { NextApiRequest, NextApiResponse } from "next";
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Put this in .env.local
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).end();

  const { messages } = req.body;

  try {
    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini", // swap with your custom GPT if you have the model ID
      messages,
    });

    res.status(200).json({
      reply: completion.choices[0].message?.content ?? "",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ reply: "⚠️ Error: Unable to connect to simulator." });
  }
}
