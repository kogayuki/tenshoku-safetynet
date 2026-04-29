import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { getAllArticles, getArticle } from "@/lib/articles";

export async function generateStaticParams() {
  return getAllArticles().map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return {};
  return {
    title: article.title,
    description: article.description,
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  return (
    <article className="max-w-[920px] mx-auto px-6 py-16">
      <nav className="flex items-center gap-2 text-xs text-ink-subtle mb-12">
        <Link href="/" className="hover:text-accent">
          ホーム
        </Link>
        <span>/</span>
        <Link href="/articles" className="hover:text-accent">
          記事
        </Link>
      </nav>

      <header className="mb-12">
        <div className="text-xs text-ink-subtle mb-4">
          {new Date(article.publishedAt).toLocaleDateString("ja-JP", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </div>
        <h1 className="font-display text-3xl md:text-4xl tracking-tightest text-ink leading-tight mb-4">
          {article.title}
        </h1>
        <p className="text-base text-ink-muted leading-relaxed">
          {article.description}
        </p>
      </header>

      <div className="rule mb-12" />

      <div className="prose-editorial max-w-prose">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{article.body}</ReactMarkdown>
      </div>

      {article.generated && (
        <aside className="mt-16 p-6 border border-border bg-paper-warm">
          <p className="text-xs text-ink-muted leading-relaxed">
            ※ この記事は AI によって自動生成された下書きを編集したものです。
            掲載情報は執筆時点のもので、実際の利用にあたっては必ず公式情報をご確認ください。
          </p>
        </aside>
      )}
    </article>
  );
}
