import Link from "next/link";
import { getAllArticles } from "@/lib/articles";

export const metadata = {
  title: "記事",
  description:
    "転職時の公的支援制度・お金・手続きに関する解説記事を掲載しています。",
};

export default function ArticlesPage() {
  const articles = getAllArticles();

  return (
    <div className="max-w-[1240px] mx-auto px-6 py-20">
      <header className="mb-16">
        <div className="text-xs tracking-[0.3em] uppercase text-accent mb-4">
          Articles
        </div>
        <h1 className="font-display text-4xl md:text-5xl tracking-tightest text-ink mb-6">
          記事
        </h1>
        <p className="text-base text-ink-muted leading-relaxed max-w-2xl">
          転職に関する公的支援制度・お金・手続きについての解説記事です。
        </p>
      </header>

      {articles.length === 0 ? (
        <div className="border border-border bg-paper-card p-12 text-center">
          <p className="text-sm text-ink-muted">
            記事は順次追加していきます。まずは
            <Link href="/systems" className="text-accent hover:underline mx-1">
              制度一覧
            </Link>
            か
            <Link href="/diagnosis" className="text-accent hover:underline mx-1">
              AI診断
            </Link>
            をご覧ください。
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border">
          {articles.map((a) => (
            <Link
              key={a.slug}
              href={`/articles/${a.slug}`}
              className="bg-paper-card p-8 hover:bg-paper-warm transition-colors group"
            >
              <div className="text-xs text-ink-subtle mb-3">
                {new Date(a.publishedAt).toLocaleDateString("ja-JP")}
              </div>
              <h2 className="font-display text-xl text-ink group-hover:text-accent transition-colors mb-3">
                {a.title}
              </h2>
              <p className="text-sm text-ink-muted leading-relaxed">
                {a.description}
              </p>
              {a.tags.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {a.tags.map((t) => (
                    <span
                      key={t}
                      className="text-[10px] tracking-widest uppercase text-ink-subtle"
                    >
                      #{t}
                    </span>
                  ))}
                </div>
              )}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
