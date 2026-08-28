import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        pamtech: {
          navy: "#101828",
          darkNavy: "#162456",
          deepWine: "#460809",
          red: "#E7000B",
          vividRed: "#FB2C36",
          coral: "#FF6467",
          orange: "#FF6900",
          royalBlue: "#134CA2",
          techBlue: "#155DFC",
          lightBlue: "#51A2FF",
          cardLight: "#F9FAFB",
          bgLight: "#F3F4F6",
          darkText: "#1F2937",
          mutedText: "#4A5565",
        },
      },
      fontFamily: {
        sans: ["var(--font-plus-jakarta)", "Plus Jakarta Sans", "sans-serif"],
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "float-slow": "float 6s ease-in-out infinite",
        "marquee": "marquee 25s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
