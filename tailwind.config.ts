import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        lagoon: { 50:"#eafaf8",100:"#c9f1ee",200:"#93e4de",300:"#4fd3cc",400:"#28bdb8",500:"#129ca0",600:"#0d7e87",700:"#0b626e",800:"#0a4d59",900:"#073b4c" },
        sand:   { 50:"#fdfbf6",100:"#faf5ea",200:"#f3e9d6",300:"#e9d9bd",400:"#d9c29a" },
        coral:  { DEFAULT:"#ff7a59", dark:"#f0603d" },
        sun:    "#ffc857",
        ink:    { DEFAULT:"#0c2b33", soft:"#3c5b62", mute:"#6f8a90" },
      },
      fontFamily: {
        display: ['var(--font-display)', 'sans-serif'],
        sans: ['var(--font-sans)', 'sans-serif'],
        latin: ['var(--font-latin)', 'sans-serif'],
      },
      letterSpacing: { tightest: "-0.03em" },
      keyframes: {
        shiny: { "0%": { backgroundPosition: "0% 50%" }, "100%": { backgroundPosition: "200% 50%" } },
        marquee: { from: { transform: "translateX(0)" }, to: { transform: "translateX(-50%)" } },
        appear: { from: { opacity: "0", transform: "translateY(28px)" }, to: { opacity: "1", transform: "none" } },
        floaty: { "0%,100%": { transform: "translateY(0)" }, "50%": { transform: "translateY(-14px)" } },
      },
      animation: {
        shiny: "shiny 8s linear infinite",
        marquee: "marquee 30s linear infinite",
        appear: "appear .8s cubic-bezier(.16,1,.3,1) forwards",
        floaty: "floaty 6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
export default config;
