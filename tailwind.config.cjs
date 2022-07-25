/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  important: true,
  theme: {
    extend: {
      colors: {
        sideContent: "#1c1e1f",
        board: "#f4f4f5",
        primary: "#1b00ff",
        borderSecond: "#333636",
      },
    },
  },
  plugins: [],
};
