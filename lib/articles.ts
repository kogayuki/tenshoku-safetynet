import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const ARTICLES_DIR = path.join(process.cwd(), "content/articles");

export type ArticleMeta = {
  slug: string;
  title: string;
  description: string;
  publishedAt: string;
  tags: string[];
  generated?: boolean;
};

export type Article = ArticleMeta & {
  body: string;
};

export function getAllArticles(): Article[] {
  if (!fs.existsSync(ARTICLES_DIR)) {
    return [];
  }

  const files = fs.readdirSync(ARTICLES_DIR).filter((f) => f.endsWith(".md"));
  const articles = files.map((file) => {
    const slug = file.replace(/\.md$/, "");
    const raw = fs.readFileSync(path.join(ARTICLES_DIR, file), "utf-8");
    const { data, content } = matter(raw);
    return {
      slug,
      title: data.title as string,
      description: data.description as string,
      publishedAt: data.publishedAt as string,
      tags: (data.tags as string[]) ?? [],
      generated: data.generated as boolean | undefined,
      body: content,
    };
  });

  return articles.sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}

export function getArticle(slug: string): Article | null {
  const articles = getAllArticles();
  return articles.find((a) => a.slug === slug) ?? null;
}
