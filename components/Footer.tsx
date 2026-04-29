import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-32 border-t border-border bg-paper-warm">
      <div className="max-w-[1240px] mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          <div className="md:col-span-5">
            <div className="font-display text-lg font-semibold text-ink mb-3">
              転職セーフティネット.AI
            </div>
            <p className="text-sm text-ink-muted leading-relaxed max-w-md">
              転職時にあるはずの公的支援を、知らないことで損する人をゼロに。
              制度の網羅と、AIによる個別タイムライン提案の二本立てで、
              あなたの判断を支える情報を提供します。
            </p>
          </div>

          <div className="md:col-span-3">
            <div className="text-xs tracking-widest text-ink-subtle uppercase mb-4">
              コンテンツ
            </div>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/systems" className="hover:text-accent transition-colors">
                  制度一覧
                </Link>
              </li>
              <li>
                <Link href="/diagnosis" className="hover:text-accent transition-colors">
                  AIタイムライン診断
                </Link>
              </li>
              <li>
                <Link href="/chat" className="hover:text-accent transition-colors">
                  AI相談
                </Link>
              </li>
              <li>
                <Link href="/articles" className="hover:text-accent transition-colors">
                  記事
                </Link>
              </li>
            </ul>
          </div>

          <div className="md:col-span-4">
            <div className="text-xs tracking-widest text-ink-subtle uppercase mb-4">
              重要事項
            </div>
            <p className="text-xs text-ink-muted leading-relaxed">
              本サイトの情報は一般的な情報提供を目的としており、個別の法的・税務的助言を構成するものではありません。
              制度の利用判断にあたっては、ハローワーク・自治体の窓口、または社会保険労務士・税理士などの専門家にご相談ください。
              制度内容は予告なく変更される場合があります。最新情報は必ず公式サイトでご確認ください。
            </p>
          </div>
        </div>

        <div className="rule mt-12" />

        <div className="mt-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 text-xs text-ink-subtle">
          <div>© {new Date().getFullYear()} 転職セーフティネット.AI</div>
          <div className="flex gap-5">
            <Link href="/privacy" className="hover:text-ink-muted">
              プライバシーポリシー
            </Link>
            <Link href="/terms" className="hover:text-ink-muted">
              利用規約
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
