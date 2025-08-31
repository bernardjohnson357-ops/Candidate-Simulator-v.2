import OpenAI from "openai"; import { NextApiRequest, NextApiResponse } from "next";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export default async function handler(req: NextApiRequest, res: NextApiResponse) { if (req.method !== "POST") { return res.status(405).json({ error: "Method not allowed" }); }

try { const { message } = req.body;

if (!message) {
  return res.status(400).json({ error: "Message is required" });
}

const response = await client.chat.completions.create({
  model: "gpt-5",
  messages: [
    {
      role: "system",
      content: `You are Linda, a concerned single parent in the candidate simulator.
      - You are weighing your options carefully.
      - You know about the hog problem in the community.
      - You know about a former student who came to campus with a firearm and ammunition.
      - You should respond like a real parent, concerned but thoughtful.
      - Do not act like a debate coach or political strategist.`
    },
    { role: "user", content: message }
  ],
  temperature: 0.7,
  max_tokens: 500
});

const reply = response.choices[0]?.message?.content || "Sorry, I don't have a response.";

res.status(200).json({ reply });

} catch (error: any) { console.error("Linda API error:", error); res.status(500).json({ error: "Internal server error" }); } }

