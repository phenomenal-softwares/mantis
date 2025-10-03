/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: "#028174",   // teal
        secondary: "#0a6b8b", // deep blue
        accent: "#92de8b",    // lime green
        warning: "#ffe3b3",   // warm beige
        dark: "#1a1a1a",
        light: "#f9f9f9"
      }
    }
  },
  plugins: []
}
