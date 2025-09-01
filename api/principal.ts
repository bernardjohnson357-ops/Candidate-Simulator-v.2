// server.ts
import { WebSocketServer } from "ws";
import OpenAI from "openai";
import fs from "fs";
import path from "path";
import { tmpdir } from "os";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Your system primer
const SYSTEM_PRIMER = `
You are running a roleplay: an ensemble meeting with a candidate for public office...
[keep your full primer here]
`;

const wss = new WebSocketServer({ port: 8080 });

wss.on("connection", (ws) => {
  console.log("Client connected");

  let chatHistory: { role: string; content: string }[] = [];

  ws.on("message", async (msg) => {
    try {
      // Convert incoming audio chunk to temp file for Whisper
      const buffer = Buffer.isBuffer(msg) ? msg : Buffer.from(msg as ArrayBuffer);
      const tempFile = path.join(tmpdir(), `chunk-${Date.now()}.webm`);
      fs.writeFileSync(tempFile, buffer);

      // Whisper transcription
      const transcription = await openai.audio.transcriptions.create({
        file: fs.createReadStream(tempFile),
        model: "whisper-1",
        response_format: "text",
      });

      fs.unlinkSync(tempFile);

      const userText = transcription;
      chatHistory.push({ role: "user", content: userText });

      // Stream ensemble chat response
      const stream = await openai.chat.completions.stream({
        model: process.env.PRINCIPAL_OFFICE_API || "gpt-4o-mini",
        messages: [
          { role: "system", content: SYSTEM_PRIMER.trim() },
          ...chatHistory,
        ],
        temperature: 0.6,
      });

      let assistantText = "";
      for await (const event of stream) {
        if (event.type === "response.output_text.delta") {
          const delta = event.delta;
          if (delta) {
            assistantText += delta;
            ws.send(delta); // send incremental update to client
          }
        }
      }

      chatHistory.push({ role: "assistant", content: assistantText });
    } catch (err: any) {
      console.error(err);
      ws.send(JSON.stringify({ error: err.message }));
    }
  });

  ws.on("close", () => console.log("Client disconnected"));
});

console.log("WebSocket server running on ws://localhost:8080");
