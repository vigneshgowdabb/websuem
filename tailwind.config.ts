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
        // Primary backgrounds
        lavender: "#F5F0FF",
        cream: "#FFFBF5",

        // Text
        "deep-purple": "#1A1235",

        // Accents
        "vibrant-yellow": "#FFD84D",
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
          DEFAULT: "#FFD84D",
          foreground: "#1A1235",
        },
        secondary: {
          DEFAULT: "#F5F0FF",
          foreground: "#1A1235",
        },
        muted: {
          DEFAULT: "#F5F0FF",
          foreground: "#6B7280",
        },
        accent: {
          DEFAULT: "#FF8A4C",
          foreground: "#FFFFFF",
        },
      },
      fontFamily: {
        heading: ["var(--font-space-grotesk)", "system-ui", "sans-serif"],
        body: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      animation: {
        "fade-up": "fadeUp 0.6s ease-out forwards",
        "fade-in": "fadeIn 0.4s ease-out forwards",
        float: "float 4s ease-in-out infinite",
        "count-up": "countUp 2s ease-out forwards",
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
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
      },
      boxShadow: {
        glow: "0 4px 20px rgba(255, 216, 77, 0.4)",
        "glow-lg": "0 8px 40px rgba(255, 216, 77, 0.3)",
        soft: "0 4px 12px rgba(0, 0, 0, 0.1)",
        "soft-lg": "0 8px 30px rgba(0, 0, 0, 0.12)",
      },
    },
  },
  plugins: [tailwindcssAnimate],
};

export default config;
