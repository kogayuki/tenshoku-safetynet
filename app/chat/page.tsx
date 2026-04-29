import ChatWindow from "./ChatWindow";

export const metadata = {
  title: "AI相談チャット",
  description:
    "転職時の公的支援制度について、24時間いつでもAIに相談できます。",
};

export default function ChatPage() {
  return (
    <div className="max-w-[920px] mx-auto px-6 py-12">
      <header className="mb-8">
        <div className="text-xs tracking-[0.3em] uppercase text-accent mb-3">
          AI Consultation
        </div>
        <h1 className="font-display text-3xl md:text-4xl tracking-tightest text-ink mb-4">
          AI相談チャット
        </h1>
        <p className="text-sm text-ink-muted leading-relaxed max-w-2xl">
          転職時に使える公的支援制度について、AIが一般的な情報をお伝えします。
          ハローワーク窓口に行く前の予習や、制度の組み合わせの整理にお使いください。
        </p>
      </header>

      <ChatWindow />

      <div className="mt-8 p-4 border border-border bg-paper-warm">
        <p className="text-xs text-ink-muted leading-relaxed">
          ※ AIの回答は一般的な情報提供であり、個別の法的・税務的助言ではありません。
          実際の申請にあたっては、必ず公式情報・ハローワーク・自治体・専門家にご確認ください。
        </p>
      </div>
    </div>
  );
}
