import type { MetadataRoute } from "next";
import { getAllSystems } from "@/lib/systems";
import { getAllArticles } from "@/lib/articles";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

  const staticPages = ["", "/systems", "/diagnosis", "/chat", "/articles"].map(
    (path) => ({
      url: `${baseUrl}${path}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: path === "" ? 1.0 : 0.8,
    })
  );

  const systemPages = getAllSystems().map((s) => ({
    url: `${baseUrl}/systems/${s.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.9,
  }));

  const articlePages = getAllArticles().map((a) => ({
    url: `${baseUrl}/articles/${a.slug}`,
    lastModified: new Date(a.publishedAt),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticPages, ...systemPages, ...articlePages];
}
