import WebSocket, { WebSocketServer } from "ws";
import OpenAI from "openai";
import fs from "fs";
import path from "path";
import { tmpdir } from "os";

// Initialize OpenAI client
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// System primer
const SYSTEM_PRIMER = `...your full primer here...`;

const wss = new WebSocketServer({ port: 8080 });

wss.on("connection", (ws: WebSocket) => {
  ws.on("message", async (msg: WebSocket.RawData) => {
    try {
      const data = JSON.parse(msg.toString());
      // ...your logic here
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error";
      ws.send(JSON.stringify({ error: errorMessage }));
    }
  });
});

      // Whisper transcription
      const transcription = await openai.audio.transcriptions.create({
        file: fs.createReadStream(tempFile),
        model: "whisper-1",
        response_format: "text",
      });

      fs.unlinkSync(tempFile);

      const userText = transcription;
      chatHistory.push({ role: "user", content: userText });

      // Chat streaming response
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
            ws.send(delta);
          }
        }
      }

      chatHistory.push({ role: "assistant", content: assistantText });
    } catch (err: unknown) {
      console.error(err);
      ws.send(
        JSON.stringify({
          error: err instanceof Error ? err.message : "Unknown error",
        })
      );
    }
  });

  ws.on("close", () => console.log("Client disconnected"));
});

console.log("WebSocket server running on ws://localhost:8080");80");
