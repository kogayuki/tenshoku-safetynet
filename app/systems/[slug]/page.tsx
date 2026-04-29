import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { getAllSystems, getSystem } from "@/lib/systems";

export async function generateStaticParams() {
  const systems = getAllSystems();
  return systems.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const sys = getSystem(slug);
  if (!sys) return {};
  return {
    title: sys.name,
    description: sys.summary,
  };
}

export default async function SystemDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const sys = getSystem(slug);
  if (!sys) notFound();

  const allSystems = getAllSystems();
  const related = allSystems.filter((s) => s.slug !== slug).slice(0, 3);

  return (
    <article className="max-w-[1240px] mx-auto px-6 py-16">
      {/* パンくず */}
      <nav className="flex items-center gap-2 text-xs text-ink-subtle mb-12">
        <Link href="/" className="hover:text-accent">
          ホーム
        </Link>
        <span>/</span>
        <Link href="/systems" className="hover:text-accent">
          制度一覧
        </Link>
        <span>/</span>
        <span className="text-ink-muted">{sys.shortName}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* 本文 */}
        <main className="lg:col-span-8">
          <div className="text-xs tracking-[0.3em] uppercase text-accent mb-4">
            {sys.category}
          </div>
          <h1 className="font-display text-3xl md:text-4xl tracking-tightest text-ink mb-6 leading-tight">
            {sys.name}
          </h1>
          <p className="text-lg text-ink-muted leading-relaxed mb-12 max-w-prose">
            {sys.summary}
          </p>

          <div className="rule mb-12" />

          <div className="prose-editorial max-w-prose">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{sys.body}</ReactMarkdown>
          </div>

          {/* 免責 */}
          <aside className="mt-16 p-6 border border-border bg-paper-warm rounded-sm">
            <div className="text-xs tracking-widest uppercase text-trust mb-2">
              Disclaimer
            </div>
            <p className="text-xs text-ink-muted leading-relaxed">
              本ページの情報は執筆時点の一般的な制度解説であり、個別の法的・税務的助言を構成するものではありません。
              金額や条件は予告なく変更される可能性があります。
              実際の利用にあたっては、必ず公式情報（厚労省・ハローワーク・自治体・税務署など）または専門家にご確認ください。
            </p>
          </aside>
        </main>

        {/* サイドバー */}
        <aside className="lg:col-span-4 space-y-8">
          <div className="border border-border p-6 bg-paper-card">
            <div className="text-xs tracking-widest uppercase text-ink-subtle mb-4">
              Quick Facts
            </div>
            <dl className="space-y-4 text-sm">
              <div>
                <dt className="text-xs text-ink-subtle mb-1">対象</dt>
                <dd className="text-ink">{sys.who}</dd>
              </div>
              <div>
                <dt className="text-xs text-ink-subtle mb-1">金額の目安</dt>
                <dd className="text-ink">{sys.amount}</dd>
              </div>
              <div>
                <dt className="text-xs text-ink-subtle mb-1">所管</dt>
                <dd className="text-ink">{sys.ministry}</dd>
              </div>
              <div>
                <dt className="text-xs text-ink-subtle mb-1">公式情報</dt>
                <dd>
                  <a
                    href={sys.officialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent hover:underline break-all text-xs"
                  >
                    {sys.officialUrl}
                  </a>
                </dd>
              </div>
            </dl>
          </div>

          <div className="border border-border p-6 bg-paper-card">
            <div className="text-xs tracking-widest uppercase text-accent mb-3">
              Action
            </div>
            <p className="text-sm text-ink-muted mb-4 leading-relaxed">
              この制度があなたに使えるか、AIで個別診断できます
            </p>
            <Link
              href="/diagnosis"
              className="block text-center py-2 px-4 bg-ink text-paper hover:bg-accent transition-colors text-sm"
            >
              AIタイムライン診断 →
            </Link>
          </div>

          <div className="border border-border p-6 bg-paper-card">
            <div className="text-xs tracking-widest uppercase text-ink-subtle mb-4">
              Related
            </div>
            <ul className="space-y-3">
              {related.map((r) => (
                <li key={r.slug}>
                  <Link
                    href={`/systems/${r.slug}`}
                    className="text-sm text-ink hover:text-accent transition-colors block"
                  >
                    → {r.shortName}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </article>
  );
}
