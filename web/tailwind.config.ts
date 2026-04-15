import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        /** Investor UI accent — premium gold */
        brand: {
          DEFAULT: "#C9A24A",
          light: "#d4b87a",
          muted: "rgba(201, 162, 74, 0.5)",
          dark: "#9a7d45",
        },
        muted: {
          DEFAULT: "#9CA3AF",
        },
        surface: {
          DEFAULT: "#0A0A0A",
          elevated: "#141414",
        },
        gold: {
          50: "#fffbeb",
          100: "#fef3c7",
          200: "#fde68a",
          300: "#fcd34d",
          400: "#fbbf24",
          500: "#f59e0b",
          600: "#d97706",
          700: "#b45309",
          800: "#92400e",
          900: "#78350f",
        },
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "ui-monospace", "monospace"],
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "page-in": {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        aurora: {
          "0%, 100%": { transform: "translate(0%, 0%) scale(1)", opacity: "0.45" },
          "33%": { transform: "translate(4%, -3%) scale(1.08)", opacity: "0.6" },
          "66%": { transform: "translate(-3%, 2%) scale(0.96)", opacity: "0.5" },
        },
        "mesh-pan": {
          "0%": { backgroundPosition: "0% 50%" },
          "100%": { backgroundPosition: "100% 50%" },
        },
        "btn-shine": {
          "0%": { transform: "translateX(-120%) skewX(-12deg)" },
          "100%": { transform: "translateX(220%) skewX(-12deg)" },
        },
        shimmer: {
          "100%": { transform: "translateX(100%)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" },
        },
        "pulse-soft": {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "0.8" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.6s ease-out forwards",
        "page-in": "page-in 0.5s cubic-bezier(0.22, 1, 0.36, 1) forwards",
        aurora: "aurora 22s ease-in-out infinite",
        "mesh-pan": "mesh-pan 28s linear infinite alternate",
        "btn-shine": "btn-shine 1.1s ease-out infinite",
        shimmer: "shimmer 2s infinite",
        float: "float 8s ease-in-out infinite",
        "pulse-soft": "pulse-soft 4s ease-in-out infinite",
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [],
} satisfies Config;
