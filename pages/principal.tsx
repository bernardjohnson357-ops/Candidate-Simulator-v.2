"use client";

import { useEffect, useRef, useState } from "react";

type Msg = { role: "user" | "assistant"; content: string };

const STARTER_PROMPT = `
Begin the meeting. Open with Dr. Howard summarizing the two hog incidents and the homecoming threat in blunt terms, then hand off to Mrs. Arnold to connect it to student trauma and staffing strain, then Karen to force clarity on arming administrators. Keep it tense but professional. Stop after ~4–5 exchanges and ask the candidate a direct yes/no on arming administrators and on funding for training/liability coverage.
`.trim();

export default function EnsemblePage() {
  const [history, setHistory] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const viewRef = useRef<HTMLDivElement>(null);

  // Auto-scroll
  useEffect(() => {
    viewRef.current?.scrollTo({ top: viewRef.current.scrollHeight, behavior: "smooth" });
  }, [history, loading]);

  const run = async (userText?: string) => {
    setLoading(true);
    const newHistory = [...history];
    if (userText && userText.trim()) {
      newHistory.push({ role: "user", content: userText.trim() });
      setHistory(newHistory);
    }
    try {
      const res = await fetch("/api/principal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ history: newHistory }),
      });

      if (!res.body) throw new Error("No response body");

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let assistantChunk = "";
      setHistory((h) => [...h, { role: "assistant", content: "" }]);

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        assistantChunk += decoder.decode(value, { stream: true });
        setHistory((h) => {
          const copy = [...h];
          const last = copy[copy.length - 1];
          if (last && last.role === "assistant") {
            last.content = assistantChunk;
          }
          return copy;
        });
      }
    } catch (e: any) {
      setHistory((h) => [
        ...h,
        { role: "assistant", content: `[[Error]] ${e?.message ?? "Unknown error"}` },
      ]);
    } finally {
      setLoading(false);
    }
  };

  // Kick off an opener if the thread is empty
  useEffect(() => {
    if (history.length === 0) {
      run(STARTER_PROMPT);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSend = async () => {
    const text = input.trim();
    if (!text) return;
    setInput("");
    await run(text);
  };

  return (
    <div className="mx-auto max-w-3xl p-4 flex flex-col h-[100dvh]">
      <header className="pb-3 border-b font-medium">
        Ensemble Meeting — Superintendent, Principal, PTO President
      </header>

      <div
        ref={viewRef}
        className="flex-1 overflow-auto my-3 rounded border p-3 whitespace-pre-wrap text-sm leading-6"
      >
        {history.map((m, i) => (
          <div key={i} className={m.role === "user" ? "mb-4 text-gray-800" : "mb-4"}>
            {m.role === "user" ? (
              <div>
                <span className="font-semibold">CANDIDATE:</span> {m.content}
              </div>
            ) : (
              <div>{m.content}</div>
            )}
          </div>
        ))}
        {loading && <div className="opacity-60 text-xs">…thinking…</div>}
      </div>

      <div className="flex gap-2">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Reply as the candidate. Be clear on arming administrators, training, liability, trauma supports…"
          className="flex-1 border rounded p-2 h-24"
        />
        <button
          onClick={onSend}
          disabled={loading}
          className="px-4 py-2 rounded bg-black text-white disabled:opacity-50"
        >
          Send
        </button>
      </div>

      <footer className="pt-2 text-xs text-gray-500">
        Pro tip: if you hedge on firearms, they will push back and withhold endorsement.
      </footer>
    </div>
  );
}
