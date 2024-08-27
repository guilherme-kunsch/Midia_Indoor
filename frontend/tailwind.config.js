/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "dark-purple": "#081A51",
        "light-white": "rgba(255,255,255,0.17)",
        "cards": "#C2C6D4",
        "dark-blue": "#46547D",
        "flash-white": "#F0F1F5",
      },
    },
  },
  plugins: [],
}
