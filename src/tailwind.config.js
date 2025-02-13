/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                primary: "#0D1B2A", // Dark Blue
                secondary: "#E0E1DD", // Light Gray
                accent: "#C9A227", // Gold
                background: "#1B263B", // Dark
                text: "#FFFFFF", // White
            },
        },
    },
    plugins: [],
};
