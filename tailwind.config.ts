import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // 静かな信頼感のパレット
        ink: {
          DEFAULT: "#1C1E26",
          soft: "#2A2D3A",
          muted: "#4A4D5A",
          subtle: "#6B6E7A",
        },
        paper: {
          DEFAULT: "#FAF7F2",
          warm: "#F4EFE7",
          card: "#FFFFFF",
        },
        accent: {
          DEFAULT: "#B85042",
          dark: "#8E3A2E",
          soft: "#E8D5CE",
        },
        trust: {
          DEFAULT: "#2C5F5D",
          soft: "#D4DEDC",
        },
        border: {
          DEFAULT: "#E5DFD3",
          soft: "#EFEADF",
        },
      },
      fontFamily: {
        display: ["var(--font-shippori)", "serif"],
        sans: ["var(--font-noto-sans)", "sans-serif"],
        mono: ["ui-monospace", "monospace"],
      },
      maxWidth: {
        prose: "68ch",
        readable: "78ch",
      },
      letterSpacing: {
        tightest: "-0.04em",
      },
    },
  },
  plugins: [],
};

export default config;
