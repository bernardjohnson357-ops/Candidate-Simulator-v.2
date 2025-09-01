import { NextRequest } from "next/server";
import OpenAI from "openai";

export async function POST(req: NextRequest) {
  try {
    // Accept audio as Blob, ArrayBuffer, or base64 JSON
    const body = await req.json();
    const { audioBase64 } = body as { audioBase64: string };

    if (!audioBase64) {
      return new Response(
        JSON.stringify({ error: "No audio provided" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Convert base64 to Uint8Array
    const audioBuffer = Uint8Array.from(
      atob(audioBase64),
      (c) => c.charCodeAt(0)
    );

    const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    // Create transcription using Whisper
    const transcription = await client.audio.transcriptions.create({
      file: new Blob([audioBuffer]),
      model: "whisper-1",
      response_format: "text"
    });

    return new Response(
      JSON.stringify({ text: transcription }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error: any) {
    return new Response(
      JSON.stringify({ error: error?.message ?? "Unknown error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
