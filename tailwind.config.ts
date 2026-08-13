import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        blue: {
          deep: "#0d2b5e",
          primary: "#1a3c6e",
          accent: "#1d4ed8",
          light: "#3b82f6",
        },
        yellow: {
          primary: "#f59e0b",
          light: "#fbbf24",
          dark: "#d97706",
        },
      },
      fontFamily: {
        inter: ["var(--font-inter)", "ui-sans-serif", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
