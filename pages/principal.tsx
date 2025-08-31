import { useRef, useState } from "react";

export default function LiveEnsembleChat() {
  const [chatText, setChatText] = useState("");
  const wsRef = useRef<WebSocket | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);

  const startStreaming = async () => {
    if (!navigator.mediaDevices || !window.MediaRecorder) {
      alert("Browser does not support audio capture.");
      return;
    }

    wsRef.current = new WebSocket("ws://localhost:8080");
    wsRef.current.onmessage = (event) => {
      setChatText((prev) => prev + event.data);
    };

    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const mediaRecorder = new MediaRecorder(stream, { mimeType: "audio/webm" });
    mediaRecorderRef.current = mediaRecorder;

    mediaRecorder.ondataavailable = async (e) => {
      if (e.data.size > 0 && wsRef.current?.readyState === WebSocket.OPEN) {
        const buffer = await e.data.arrayBuffer();
        wsRef.current.send(buffer);
      }
    };

    mediaRecorder.start(3000); // send chunks every 3 seconds
  };

  const stopStreaming = () => {
    mediaRecorderRef.current?.stop();
    wsRef.current?.close();
  };

  return (
    <div>
      <button onClick={startStreaming}>Start Speaking</button>
      <button onClick={stopStreaming}>Stop</button>
      <pre style={{ whiteSpace: "pre-wrap" }}>{chatText}</pre>
    </div>
  );
}
