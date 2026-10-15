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
        forest: {
          50: "#F0F5F2",
          100: "#DEEBE4",
          200: "#BCD8CB",
          300: "#8FBEAA",
          400: "#5B9E82",
          500: "#388064",
          600: "#27664E",
          700: "#1E513E",
          800: "#184233",
          900: "#14342B",
          950: "#0A1D17",
        },
        paper: {
          DEFAULT: "#F6F4ED",
          50: "#FCFBF8",
          100: "#F6F4ED",
          200: "#EAE6D8",
          300: "#DCD5C1",
          400: "#C8BEA3",
        },
        limeaccent: {
          DEFAULT: "#D4F973",
          hover: "#C2EA59",
          muted: "#E5F9A6",
          dark: "#A3D42F",
        },
        academic: {
          surface: "#FFFFFF",
          border: "#D8DFD5",
          borderStrong: "#B8C4B4",
          subtle: "#5B7165",
          muted: "#768B80",
          cardHover: "#F9FAF7",
        },
      },
      fontFamily: {
        sans: [
          "Inter",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "sans-serif",
        ],
        serif: [
          "Charter",
          "Bitstream Charter",
          "Sitka Text",
          "Cambria",
          "serif",
        ],
        mono: ["JetBrains Mono", "Fira Code", "monospace"],
      },
    },
  },
  plugins: [],
};
export default config;
