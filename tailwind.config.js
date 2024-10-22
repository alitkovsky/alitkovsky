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
        DEFAUlT: "15px"
      },
    },
    screens: {
      sm: "500px",
      md: "864px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
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
        primary: "#1c1c22",
        accent: {
          DEFAULT: "rgb(195 235 241 / 1)",
          hover: "rgb(195 235 241 / 1)",
        },
        background: "rgb(5 26 28 / 1)",
        foreground: "rgb(195 235 241 / 1)",
        link: "rgb(195 235 241 / 0.45)",
      },
      fontSize: {
        clamp: "clamp(1rem, 5vw, 3rem)",
        // lg: "clamp(1rem, 5vw, 3rem)",
        // xl: "clamp(36px, 6.35vw, 6.35vw)",
        // xxl: "clamp(1rem, 5vw, 3rem)",
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