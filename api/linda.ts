import type { NextApiRequest, NextApiResponse } from "next";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  // 👇 Move console.log here
  console.log("Incoming messages:", req.body);

  try {
    const { messages } = req.body;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages,
    });

    const reply = completion.choices?.[0]?.message?.content ?? "Sorry, I didn't get that.";
    res.status(200).json({ reply });
  } catch (error) {
    console.error("Linda API error:", error);
    res.status(500).json({ error: "Something went wrong with Linda." });
  }
}
