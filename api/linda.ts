import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (!process.env.OPENAI_API_KEY) {
    return res.status(500).json({ error: "Missing server OpenAI key" });
  }

  try {
    // Generate ephemeral key via OpenAI REST endpoint
    const r = await fetch("https://api.openai.com/v1/realtime/sessions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4o-realtime-preview",
        voice: "verse",
        modalities: ["text","audio"],
      }),
    });

    const data = await r.json();
    res.status(200).json(data);
  } catch (err: any) {
    console.error("Failed to create ephemeral session:", err);
    res.status(500).json({ error: err.message });
  }
}
