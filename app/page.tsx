import Link from "next/link";
import { getAllSystems } from "@/lib/systems";

export default function HomePage() {
  const systems = getAllSystems();

  return (
    <div>
      {/* HERO */}
      <section className="max-w-[1240px] mx-auto px-6 pt-20 pb-32">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-end">
          <div className="md:col-span-8">
            <div className="text-xs tracking-[0.3em] uppercase text-accent mb-6">
              For Job Changers — 2026
            </div>
            <h1 className="font-display text-[2.5rem] md:text-[3.75rem] leading-[1.15] tracking-tightest text-ink mb-6">
              転職時に、
              <br />
              知らないと損する
              <br />
              <span className="text-accent">公的支援</span>を、すべて。
            </h1>
            <p className="text-base md:text-lg text-ink-muted leading-relaxed max-w-xl">
              失業給付・再就職手当・教育訓練給付金・国保 vs 任意継続――
              制度を知らないだけで、転職時に何十万円もの差が出ます。
              当サイトは、転職にまつわる公的支援を網羅したデータベースと、
              あなたの状況に合わせて最適な活用順序を提案するAIで、
              判断材料を整えるためのツールです。
            </p>
          </div>
          <div className="md:col-span-4 md:text-right">
            <div className="flex flex-col items-start md:items-end gap-3">
              <Link
                href="/diagnosis"
                className="inline-flex items-center gap-3 px-6 py-3 bg-ink text-paper hover:bg-accent transition-colors duration-200 group"
              >
                <span className="text-sm tracking-wide">あなたに使える制度を診断</span>
                <span className="text-lg group-hover:translate-x-1 transition-transform">→</span>
              </Link>
              <Link
                href="/chat"
                className="text-sm text-ink-muted hover:text-accent transition-colors"
              >
                AIに直接聞く（24時間無料） →
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div className="rule" />

      {/* 制度カタログ */}
      <section className="max-w-[1240px] mx-auto px-6 py-24">
        <div className="flex items-baseline justify-between mb-12">
          <div>
            <div className="text-xs tracking-[0.25em] uppercase text-ink-subtle mb-2">
              Catalog
            </div>
            <h2 className="font-display text-3xl md:text-4xl text-ink">
              転職時に関わる９つの制度
            </h2>
          </div>
          <Link
            href="/systems"
            className="hidden md:block text-sm text-ink-muted hover:text-accent transition-colors"
          >
            一覧を見る →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
          {systems.map((system, idx) => (
            <Link
              key={system.slug}
              href={`/systems/${system.slug}`}
              className="bg-paper-card p-8 hover:bg-paper-warm transition-colors duration-200 group flex flex-col"
            >
              <div className="flex items-start justify-between mb-4">
                <span className="chapter-num text-sm">
                  {String(idx + 1).padStart(2, "0")}
                </span>
                <span className="text-[10px] tracking-widest uppercase text-ink-subtle px-2 py-1 border border-border">
                  {system.category}
                </span>
              </div>
              <h3 className="font-display text-xl text-ink leading-snug mb-3 group-hover:text-accent transition-colors">
                {system.shortName}
              </h3>
              <p className="text-sm text-ink-muted leading-relaxed flex-1">
                {system.summary}
              </p>
              <div className="mt-6 pt-4 border-t border-border text-xs text-ink-subtle">
                {system.amount}
              </div>
            </Link>
          ))}
        </div>
      </section>

      <div className="rule" />

      {/* AIフィーチャーセクション */}
      <section className="max-w-[1240px] mx-auto px-6 py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border">
          <div className="bg-paper-card p-12 group">
            <div className="text-xs tracking-[0.25em] uppercase text-accent mb-4">
              Feature 01
            </div>
            <h3 className="font-display text-2xl text-ink mb-4">
              AIタイムライン診断
            </h3>
            <p className="text-sm text-ink-muted leading-relaxed mb-8">
              5問の質問に答えるだけで、あなたの状況にあった制度の活用順序とタイミングをAIが提案します。
              「いつ退職すれば失業給付が△万円増える」「教育訓練給付の手続きは退職の何日前までに」など、
              個別の判断材料が手に入ります。
            </p>
            <Link
              href="/diagnosis"
              className="inline-flex items-center gap-2 text-sm text-ink hover:text-accent transition-colors"
            >
              診断を始める <span>→</span>
            </Link>
          </div>
          <div className="bg-paper-card p-12 group">
            <div className="text-xs tracking-[0.25em] uppercase text-accent mb-4">
              Feature 02
            </div>
            <h3 className="font-display text-2xl text-ink mb-4">AI相談チャット</h3>
            <p className="text-sm text-ink-muted leading-relaxed mb-8">
              制度のことで分からないことを、24時間いつでもAIに相談できます。
              制度の組み合わせ、申請のタイミング、書類の準備など、
              ハローワーク窓口に行く前の予習に最適です。
            </p>
            <Link
              href="/chat"
              className="inline-flex items-center gap-2 text-sm text-ink hover:text-accent transition-colors"
            >
              チャットを開く <span>→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 信頼ブロック */}
      <section className="bg-paper-warm">
        <div className="max-w-[1240px] mx-auto px-6 py-20">
          <div className="max-w-3xl">
            <div className="text-xs tracking-[0.25em] uppercase text-trust mb-4">
              Mission
            </div>
            <p className="font-display text-2xl md:text-3xl leading-[1.6] text-ink">
              転職という人生の節目で、
              <br />
              情報の非対称性によって損をする人を、
              <br />
              <span className="text-accent">ゼロに近づける。</span>
            </p>
            <p className="text-sm text-ink-muted leading-relaxed mt-8 max-w-2xl">
              当サイトの情報は一般的な情報提供を目的としており、個別の法的・税務的助言を構成するものではありません。
              制度の利用判断にあたっては、ハローワーク・自治体の窓口、または社会保険労務士・税理士などの専門家にご相談ください。
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
