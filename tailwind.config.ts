import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["src/**/*.{html,md,mdx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        resources: ["var(--font-resources)"],
        heading: ["var(--font-heading)"],
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui"],
      },
      lineHeight: {
        "14": "4rem",
      },
      maxWidth: {
        "2xl": "43.75rem",
        "5xl": "70rem",
      },
      colors: {
        primary: "#5D5DC5",
        secondary: "#1F4498",
        accent: "#FCAF3B",
        black: "#123032",
        pink: "#D70E86",
        navy: "#703B96",
        blue: {
          300: "#ACC6FF",
        },
        green: {
          300: "#dcf6d4",
          500: "#52AF87",
          600: "#86C0AC",
          700: "#327A74"
        },
        grey: {
          "100": "#FAFAFF",
          "200": "#EEE7F7",
          "300": "#E0E0FF",
          "400": "#D2CBFF",
          "500": "#5D5DC5",
          "700": "#242464",
          "800": "#171740",
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
      backgroundImage: {
        gradient: "linear-gradient(140deg, #d70e86 0%, #703b96 100%)",
        "radial-gradient":
          "radial-gradient(330.41% 146% at 12.59% -31.25%, #D70E86 0%, #703B96 100%)",
        "radial-elipse": "url('/images/bgRadiant.png')",
      },
    },
  },
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  plugins: [require("@tailwindcss/typography")],
} satisfies Config;
