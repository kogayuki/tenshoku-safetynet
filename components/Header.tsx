import Link from "next/link";

const navItems = [
  { href: "/systems", label: "制度を知る" },
  { href: "/diagnosis", label: "AI診断" },
  { href: "/chat", label: "AI相談" },
  { href: "/articles", label: "記事" },
];

export default function Header() {
  return (
    <header className="border-b border-border bg-paper/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-[1240px] mx-auto px-6 py-5 flex items-center justify-between">
        <Link href="/" className="group">
          <div className="flex items-baseline gap-3">
            <span className="font-display text-xl font-semibold tracking-tightest text-ink">
              転職セーフティネット
            </span>
            <span className="text-[10px] tracking-[0.2em] text-accent uppercase font-sans">
              .AI
            </span>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-ink-muted hover:text-accent transition-colors duration-200 relative group"
            >
              {item.label}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-accent group-hover:w-full transition-all duration-300" />
            </Link>
          ))}
        </nav>

        <Link
          href="/diagnosis"
          className="md:hidden text-xs px-3 py-1.5 border border-ink rounded-sm hover:bg-ink hover:text-paper transition-colors"
        >
          AI診断
        </Link>
      </div>
    </header>
  );
}
