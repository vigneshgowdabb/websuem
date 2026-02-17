import type { Config } from "tailwindcss";

// eslint-disable-next-line @typescript-eslint/no-require-imports
const tailwindcssAnimate = require("tailwindcss-animate");

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary dark backgrounds
        "deep-green": "#021A0A",
        "dark-navy": "#0A1628",
        forest: "#0D2818",
        "dark-surface": "#111827",

        // Accent greens
        "accent-green": "#4ADE80",
        "bright-green": "#22C55E",

        // Secondary accent
        gold: "#F59E0B",

        // Text on dark
        "warm-cream": "#F5F0E8",
        "muted-cream": "#A3A08E",

        // Legacy (kept for CRM pages)
        "deep-purple": "#1A1235",
        "vibrant-yellow": "#FFD84D",
        lavender: "#F5F0FF",
        cream: "#FFFBF5",
        "warm-orange": "#FF8A4C",
        "soft-pink": "#FFE4E6",
        mint: "#D1FAE5",
        sky: "#DBEAFE",

        // Keep shadcn defaults
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "#22C55E",
          foreground: "#021A0A",
        },
        secondary: {
          DEFAULT: "#0A1628",
          foreground: "#F5F0E8",
        },
        muted: {
          DEFAULT: "#111827",
          foreground: "#A3A08E",
        },
        accent: {
          DEFAULT: "#F59E0B",
          foreground: "#021A0A",
        },
      },
      fontFamily: {
        heading: ["var(--font-playfair)", "Georgia", "serif"],
        body: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      animation: {
        "fade-up": "fadeUp 0.6s ease-out forwards",
        "fade-in": "fadeIn 0.4s ease-out forwards",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
      boxShadow: {
        glow: "0 4px 20px rgba(74, 222, 128, 0.3)",
        "glow-lg": "0 8px 40px rgba(74, 222, 128, 0.2)",
        soft: "0 4px 12px rgba(0, 0, 0, 0.3)",
        "soft-lg": "0 8px 30px rgba(0, 0, 0, 0.4)",
      },
    },
  },
  plugins: [tailwindcssAnimate],
};

export default config;
