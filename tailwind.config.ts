import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "app/**/*.{html,md,mdx,ts,tsx}",
    "components/**/*.{html,md,mdx,ts,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        heading: ["var(--font-heading)"],
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui"],
      },
      colors: {
        primary: "#5555FF",
        secondary: "#1F4498",
        accent: "#FCAF3B",
        black: "#123032",
        pink: "#D70E86",
        navy: "#253A8A",
        grey: {
          "100": "#FAFAFF",
          "300": "#E0E0FF",
          "400": "#D2CBFF",
          "500": "#5D5DC5",
          "700": "#242464",
          "900": "#132032",
        },
        error: "#F04C4C",
        success: "#88DA62",
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
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [],
} satisfies Config;
