import type { Metadata } from "next";
import { Shippori_Mincho_B1, Noto_Sans_JP } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const shippori = Shippori_Mincho_B1({
  weight: ["500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-shippori",
  display: "swap",
});

const notoSans = Noto_Sans_JP({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-noto-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
  ),
  title: {
    default: "転職セーフティネット.AI ｜ 知らないと損する転職時の公的支援を集約",
    template: "%s ｜ 転職セーフティネット.AI",
  },
  description:
    "失業給付・再就職手当・教育訓練給付金など、転職時に使える公的支援制度を網羅。AIがあなたの状況に合わせて最適な制度活用タイムラインを提案します。",
  openGraph: {
    type: "website",
    locale: "ja_JP",
    siteName: "転職セーフティネット.AI",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja" className={`${shippori.variable} ${notoSans.variable}`}>
      <body className="font-sans relative">
        <div className="relative z-10 flex flex-col min-h-screen">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
