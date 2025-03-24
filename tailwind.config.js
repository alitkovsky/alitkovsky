/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './app/**/*.{js,jsx}',
    './src/**/*.{js,jsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: {
        DEFAUlT: "16px"
      },
    },
    fontFamily: {
      primary: "var(--font-family)",
      secondary: "var(--font-fira-code), system-ui, sans-serif",
    },
    extend: {
      gridTemplateColumns: {
        "grid-columns-12": "repeat(12, [col-start] 1fr)",
        "grid-columns-6": "repeat(6, [col-start] 1fr)",
        "grid-columns-4": "repeat(4, [col-start] 1fr)",
        "grid-columns-3": "repeat(3, [col-start] 1fr)",
        "grid-columns-2": "repeat(2, [col-start] 1fr)",
        "grid-columns-1": "repeat(11 [col-start] 1fr)",
      },
      colors: {
        primary: "rgba(5 26 28 / 1)",
        accent: {
          DEFAULT: "rgba(195 235 241 / 1)",
          hover: "rgba(195 235 241 / 1)",
        },
        background: "y",
        foreground: "rgba(195 235 241 / 1)",
        link: "rgba(195 235 241 / 0.45)",
      },
      fontSize: {
        "huge--sm": "clamp(32px, 7.5vw, 7.5vw)",
        "large--sm": "clamp(22px, 2.64vw, 2.64vw)",
        "huge--lg": "clamp(36px, 7.77vw, 7.77vw)",
        "large--lg": "clamp(22px, 2.74vw, 2.74vw)",
        "huge--xl": "clamp(36px, 6.35vw, 6.35vw)",
        "large--xl": "clamp(26px, 2.24vw, 2.24vw)",
        "medium": "var(--font--size-medium)",
        "regular": "var(--font--size-regular)",

      },
      background: {
        hero: "url(/assets/photo_bg.png)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}