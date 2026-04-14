"use client";

import { useState } from "react";

type Msg = { role: "user" | "assistant"; content: string };

export function GuideChat() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Msg[]>([]);
  const [loading, setLoading] = useState(false);

  async function send() {
    const text = input.trim();
    if (!text || loading) return;
    setInput("");
    const next: Msg[] = [...messages, { role: "user", content: text }];
    setMessages(next);
    setLoading(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: next.map((m) => ({ role: m.role, content: m.content })),
        }),
      });
      const data = (await res.json()) as { reply?: string; error?: string };
      const reply =
        data.reply ?? (data.error ? `Error: ${data.error}` : "No response.");
      setMessages([...next, { role: "assistant", content: reply }]);
    } catch (e) {
      setMessages([
        ...next,
        {
          role: "assistant",
          content: e instanceof Error ? e.message : "Request failed.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-4">
      <h2 className="text-sm font-medium text-emerald-400">AI assistant (demo)</h2>
      <p className="mt-1 text-xs text-zinc-500">
        Answers use this app&apos;s docs and your configured contract addresses. Not legal advice.
      </p>
      <div className="mt-3 max-h-64 space-y-2 overflow-y-auto text-sm">
        {messages.length === 0 && (
          <p className="text-zinc-500">Ask how registration differs from share tokens, or what to do first.</p>
        )}
        {messages.map((m, i) => (
          <div
            key={i}
            className={m.role === "user" ? "text-right text-zinc-200" : "text-left text-zinc-400"}
          >
            <span className="font-mono text-[10px] text-zinc-600">{m.role}</span>
            <p className="whitespace-pre-wrap">{m.content}</p>
          </div>
        ))}
      </div>
      <div className="mt-3 flex gap-2">
        <input
          className="flex-1 rounded border border-zinc-700 bg-zinc-950 px-2 py-1.5 text-sm"
          placeholder="Ask a question…"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && send()}
        />
        <button
          type="button"
          disabled={loading}
          onClick={send}
          className="rounded bg-emerald-700 px-3 py-1.5 text-sm text-white hover:bg-emerald-600 disabled:opacity-50"
        >
          {loading ? "…" : "Send"}
        </button>
      </div>
    </div>
  );
}
