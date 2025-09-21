import type { Config } from "tailwindcss";

export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./ironhorse/**/*.{js,ts,jsx,tsx,mdx}",   // in case any Phase 3 bits remain here
  ],
  theme: { extend: {} },
  plugins: [],
} satisfies Config;
