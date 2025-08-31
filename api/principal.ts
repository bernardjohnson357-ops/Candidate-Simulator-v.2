// server.js
import { WebSocketServer } from "ws";
import OpenAI from "openai";
import fs from "fs";
import { tmpdir } from "os";
import path from "path";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const SYSTEM_PRIMER = `...`; // keep your ensemble system primer here

const wss = new WebSocketServer({ port: 8080 });

wss.on("connection", (ws) => {
  console.log("Client connected");

  let chatHistory: any[] = [];

  ws.on("message", async (msg) => {
    try {
      // Convert ArrayBuffer / Buffer to a temporary file for Whisper
      const buffer = Buffer.isBuffer(msg) ? msg : Buffer.from(msg);
      const tempPath = path.join(tmpdir(), `chunk-${Date.now()}.webm`);
      fs.writeFileSync(tempPath, buffer);

      // Transcribe chunk
      const transcription = await openai.audio.transcriptions.create({
        file: fs.createReadStream(tempPath),
        model: "whisper-1",
        response_format: "text",
      });

      fs.unlinkSync(tempPath);

      const userText = transcription;

      // Append to chat history
      chatHistory.push({ role: "user", content: userText });

      // Stream ensemble chat response
      const stream = await openai.chat.completions.stream({
        model: process.env.PRINCIPAL_OFFICE_API || "gpt-4o-mini",
        messages: [{ role: "system", content: SYSTEM_PRIMER.trim() }, ...chatHistory],
        temperature: 0.6,
      });

      let assistantText = "";

      for await (const event of stream) {
        if (event.type === "response.output_text.delta") {
          const delta = event.delta;
          if (delta) {
            assistantText += delta;
            ws.send(delta); // incremental stream to client
          }
        }
      }

      // Append full assistant message to history
      chatHistory.push({ role: "assistant", content: assistantText });
    } catch (err: any) {
      console.error(err);
      ws.send(JSON.stringify({ error: err.message }));
    }
  });

  ws.on("close", () => console.log("Client disconnected"));
});

console.log("WebSocket server running on ws://localhost:8080");
