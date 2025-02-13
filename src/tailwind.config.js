/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                primary: "#0D1B2A",
                secondary: "#E0E1DD",
                accent: "#C9A227",
                background: "#1B263B",
                text: "#FFFFFF"
            }
        }
    },
    plugins: []
};
