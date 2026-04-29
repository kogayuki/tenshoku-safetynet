import DiagnosisFlow from "./DiagnosisFlow";

export const metadata = {
  title: "AIタイムライン診断",
  description:
    "5つの質問に答えるだけで、あなたの状況に合った制度の活用順序とタイミングをAIが提案します。",
};

export default function DiagnosisPage() {
  return (
    <div className="max-w-[920px] mx-auto px-6 py-16">
      <header className="mb-12 text-center">
        <div className="text-xs tracking-[0.3em] uppercase text-accent mb-4">
          Personal Timeline
        </div>
        <h1 className="font-display text-3xl md:text-4xl tracking-tightest text-ink mb-4">
          AIタイムライン診断
        </h1>
        <p className="text-base text-ink-muted leading-relaxed max-w-xl mx-auto">
          いくつかの質問にお答えいただくと、あなたの状況に合った制度活用のタイムラインを
          AIが提案します。所要時間は約2〜3分です。
        </p>
      </header>

      <DiagnosisFlow />

      <div className="mt-12 p-5 border border-border bg-paper-warm">
        <p className="text-xs text-ink-muted leading-relaxed">
          ※ 本診断の結果は一般的な情報提供であり、個別の法的・税務的助言ではありません。
          実際の手続きにあたっては、ハローワーク・自治体窓口・専門家にご相談ください。
        </p>
      </div>
    </div>
  );
}
