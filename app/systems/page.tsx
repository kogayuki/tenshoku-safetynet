import Link from "next/link";
import { getAllSystems } from "@/lib/systems";

export const metadata = {
  title: "制度一覧",
  description:
    "失業給付・再就職手当・教育訓練給付金など、転職時に使える9つの公的支援制度を一覧で確認できます。",
};

export default function SystemsPage() {
  const systems = getAllSystems();
  const byCategory = systems.reduce<Record<string, typeof systems>>(
    (acc, sys) => {
      const list = acc[sys.category] ?? [];
      list.push(sys);
      acc[sys.category] = list;
      return acc;
    },
    {}
  );

  return (
    <div className="max-w-[1240px] mx-auto px-6 py-20">
      <header className="mb-16">
        <div className="text-xs tracking-[0.3em] uppercase text-accent mb-4">
          All Systems
        </div>
        <h1 className="font-display text-4xl md:text-5xl tracking-tightest text-ink mb-6">
          転職時に使える公的支援制度
        </h1>
        <p className="text-base text-ink-muted leading-relaxed max-w-2xl">
          雇用保険・税・社会保険の各制度を、転職者の視点で整理しました。
          各制度ページでは、いくらもらえるか・いつ申請するか・ありがちな損まで詳しく解説しています。
        </p>
      </header>

      <div className="space-y-16">
        {Object.entries(byCategory).map(([category, list]) => (
          <section key={category}>
            <div className="flex items-baseline gap-4 mb-8">
              <h2 className="font-display text-2xl text-ink">{category}</h2>
              <div className="flex-1 h-px bg-border" />
              <span className="text-xs text-ink-subtle">
                {list.length} 件
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border">
              {list.map((sys) => (
                <Link
                  key={sys.slug}
                  href={`/systems/${sys.slug}`}
                  className="bg-paper-card p-8 hover:bg-paper-warm transition-colors group"
                >
                  <h3 className="font-display text-xl text-ink mb-3 group-hover:text-accent transition-colors">
                    {sys.name}
                  </h3>
                  <p className="text-sm text-ink-muted leading-relaxed mb-4">
                    {sys.summary}
                  </p>
                  <dl className="text-xs text-ink-subtle space-y-1">
                    <div className="flex gap-2">
                      <dt className="font-medium">対象</dt>
                      <dd>{sys.who}</dd>
                    </div>
                    <div className="flex gap-2">
                      <dt className="font-medium">金額</dt>
                      <dd>{sys.amount}</dd>
                    </div>
                  </dl>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
