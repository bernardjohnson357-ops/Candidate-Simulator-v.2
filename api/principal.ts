import { NextRequest } from "next/server";
import OpenAI from "openai";

export const runtime = "edge";

const SYSTEM_PRIMER = `...`; // Keep your primer as-is

type ClientMessage = {
  role: "user" | "assistant" | "system";
  content: string;
};

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { history } = body as { history: ClientMessage[] };

    const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const model = process.env.PRINCIPAL_OFFICE_API || "gpt-4o-mini";

    const messages = [
      { role: "system" as const, content: SYSTEM_PRIMER.trim() },
      ...(Array.isArray(history) ? history : []),
    ];

    // Streaming call
    const stream = await client.chat.completions.stream({
      model,
      messages,
      temperature: 0.6,
      top_p: 0.9,
      presence_penalty: 0.2,
      frequency_penalty: 0.2,
    });

    const encoder = new TextEncoder();

    const readable = new ReadableStream({
      async start(controller) {
        try {
          for await (const event of stream) {
            if (event.type === "response.output_text.delta") {
              const delta = event.delta;
              if (delta) controller.enqueue(encoder.encode(delta));
            }
          }
          controller.close();
        } catch (err) {
          controller.error(err);
        }
      },
    });

    return new Response(readable, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-cache",
        // Optional for streaming
        "Transfer-Encoding": "chunked",
      },
    });
  } catch (error: any) {
    return new Response(
      JSON.stringify({ error: error?.message ?? "Unknown error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
