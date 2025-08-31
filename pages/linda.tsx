import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    // Call OpenAI’s endpoint for ephemeral keys
    const resp = await fetch("https://api.openai.com/v1/realtime/sessions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`, // permanent key lives in .env
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4o-realtime-preview",
        voice: "verse", // you can pick a voice if doing audio
      }),
    });

    const data = await resp.json();

    if (!resp.ok) {
      console.error("Error from OpenAI:", data);
      return res.status(resp.status).json({ error: data });
    }

    // Return ephemeral session credentials to frontend
    return res.status(200).json(data);
  } catch (err: any) {
    console.error("Server error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}
