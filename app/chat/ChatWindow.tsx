"use client";

import { useState, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

type Message = {
  role: "user" | "assistant";
  content: string;
};

const SUGGESTED_PROMPTS = [
  "失業給付と再就職手当はどう違う？",
  "退職前にやっておくべきことを教えて",
  "教育訓練給付金で受けられる講座の探し方",
  "国保と任意継続、どちらが安いか比較したい",
];

export default function ChatWindow() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [streaming, setStreaming] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);

  async function send(content: string) {
    if (!content.trim() || streaming) return;

    const userMsg: Message = { role: "user", content };
    const newMessages = [...messages, userMsg];
    setMessages([...newMessages, { role: "assistant", content: "" }]);
    setInput("");
    setStreaming(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages }),
      });

      if (!res.ok || !res.body) {
        throw new Error("Network error");
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let assistantContent = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        assistantContent += chunk;
        setMessages([
          ...newMessages,
          { role: "assistant", content: assistantContent },
        ]);
      }
    } catch {
      setMessages([
        ...newMessages,
        {
          role: "assistant",
          content:
            "エラーが発生しました。時間をおいて再度お試しください。",
        },
      ]);
    } finally {
      setStreaming(false);
    }
  }

  return (
    <div className="border border-border bg-paper-card">
      {/* メッセージエリア */}
      <div
        ref={scrollRef}
        className="h-[480px] overflow-y-auto p-6 md:p-8 space-y-6"
      >
        {messages.length === 0 ? (
          <div className="h-full flex flex-col justify-center">
            <p className="text-sm text-ink-muted text-center mb-8">
              制度のことで気になることをお気軽にどうぞ
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 max-w-xl mx-auto w-full">
              {SUGGESTED_PROMPTS.map((p) => (
                <button
                  key={p}
                  onClick={() => send(p)}
                  className="text-left text-xs text-ink-muted hover:text-accent border border-border hover:border-accent px-4 py-3 transition-colors"
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
        ) : (
          messages.map((msg, idx) => (
            <div
              key={idx}
              className={msg.role === "user" ? "flex justify-end" : ""}
            >
              <div
                className={
                  msg.role === "user"
                    ? "max-w-[85%] bg-ink text-paper px-4 py-3 text-sm leading-relaxed"
                    : "max-w-[95%] text-sm text-ink"
                }
              >
                {msg.role === "user" ? (
                  msg.content
                ) : msg.content ? (
                  <div className="prose-editorial prose-editorial-chat">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {msg.content}
                    </ReactMarkdown>
                  </div>
                ) : (
                  <span className="text-ink-subtle">考え中...</span>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* 入力エリア */}
      <div className="border-t border-border p-4">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            send(input);
          }}
          className="flex gap-2"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="質問を入力"
            disabled={streaming}
            className="flex-1 px-4 py-2.5 border border-border bg-paper text-ink text-sm focus:outline-none focus:border-accent disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={streaming || !input.trim()}
            className="px-5 py-2.5 bg-ink text-paper text-sm hover:bg-accent transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          >
            送る
          </button>
        </form>
      </div>
    </div>
  );
}
