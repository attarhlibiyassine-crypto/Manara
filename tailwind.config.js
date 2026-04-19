/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
        colors: {
            "primary": "#ffbf00",
            "navy-900": "#0f172a",
            "navy-800": "#1e293b",
            "background-light": "#f8f8f5",
            "background-dark": "#231e0f",
        },
        fontFamily: {
            "display": ["Lexend", "sans-serif"]
        },
        borderRadius: {"DEFAULT": "0.25rem", "lg": "0.5rem", "xl": "0.75rem", "full": "9999px"},
    },
  },
  plugins: [],
}
