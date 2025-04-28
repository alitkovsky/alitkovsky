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
    extend: {
      colors: {
        primary: "rgba(5 26 28 / 1)",
        accent: {
          DEFAULT: "rgba(195 235 241 / 1)",
          hover: "rgba(195 235 241 / 1)",
        },
        background: "rgba(195 235 241 / 1)",
        foreground: "rgba(195 235 241 / 1)",
        link: "rgba(195 235 241 / 0.45)",
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