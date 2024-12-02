import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      height: {
        "h-screen": "var(--tg-viewport-height)",
      },
      colors: {
        border: "var(--tg-theme-section-separator-color)",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "var(--tg-theme-bg-color)",
        foreground: "var(--tg-theme-text-color)",
        primary: {
          DEFAULT: "var(--tg-theme-button-color)",
          foreground: "var(--tg-theme-button-text-color)",
        },
        secondary: {
          DEFAULT: "var(--tg-theme-hint-color)",
          foreground: "var(--tg-theme-hint-color)",
        },
        destructive: {
          DEFAULT: "var(--tg-theme-destructive-text-color)",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "var(--tg-theme-secondary-bg-color)",
          foreground: "var(--tg-theme-text-color)",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
      },
    },
  },
  plugins: [],
};
export default config;
