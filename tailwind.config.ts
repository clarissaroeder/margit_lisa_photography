import type { Config } from "tailwindcss";
const plugin = require('tailwindcss/plugin');

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
        "custom-orange": {
          '1': "#F25430",
          '2': "#A63921",
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
