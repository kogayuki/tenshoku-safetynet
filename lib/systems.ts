import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const SYSTEMS_DIR = path.join(process.cwd(), "content/systems");

export type SystemMeta = {
  slug: string;
  name: string;
  shortName: string;
  category: "失業給付" | "再就職支援" | "教育訓練" | "住居支援" | "税・社会保険" | "雇用保険認定";
  summary: string;
  amount: string;
  who: string;
  ministry: string;
  officialUrl: string;
  order: number;
};

export type System = SystemMeta & {
  body: string;
};

export function getAllSystems(): System[] {
  if (!fs.existsSync(SYSTEMS_DIR)) {
    return [];
  }

  const files = fs.readdirSync(SYSTEMS_DIR).filter((f) => f.endsWith(".md"));
  const systems = files.map((file) => {
    const slug = file.replace(/\.md$/, "");
    const raw = fs.readFileSync(path.join(SYSTEMS_DIR, file), "utf-8");
    const { data, content } = matter(raw);
    return {
      slug,
      name: data.name as string,
      shortName: data.shortName as string,
      category: data.category as SystemMeta["category"],
      summary: data.summary as string,
      amount: data.amount as string,
      who: data.who as string,
      ministry: data.ministry as string,
      officialUrl: data.officialUrl as string,
      order: (data.order as number) ?? 999,
      body: content,
    };
  });

  return systems.sort((a, b) => a.order - b.order);
}

export function getSystem(slug: string): System | null {
  const systems = getAllSystems();
  return systems.find((s) => s.slug === slug) ?? null;
}

/**
 * AI機能のコンテキスト用に、全制度を圧縮した一行サマリーで返す
 */
export function getSystemsContextForAI(): string {
  const systems = getAllSystems();
  return systems
    .map(
      (s) =>
        `[${s.shortName}] ${s.summary} (対象: ${s.who} / 金額: ${s.amount} / 区分: ${s.category})`
    )
    .join("\n");
}
