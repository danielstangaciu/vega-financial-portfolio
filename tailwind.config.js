/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#0D1B2A",
        primary: "#1B263B",
        secondary: "#415A77",
        accent: "#E0E1DD",
      },
    },
  },
  plugins: [],
};
