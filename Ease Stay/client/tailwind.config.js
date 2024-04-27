/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        "first":"#0D1821",
        "secondary":"#c85c4f",
        "background":"#e1e4e9",
        "header-bg":"#bebedb"
      },
      screens: {
        md: { max: "1280px" }, // Tablet
        sm: { max: "665px" }   // Small phone
      }
    },
  },
  plugins: [],
}

