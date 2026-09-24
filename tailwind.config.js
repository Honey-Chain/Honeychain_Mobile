/** @type {import("tailwindcss").Config} */
module.exports = {
  darkMode: "class",

  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],

  presets: [require("nativewind/preset")],

  theme: {
    extend: {
      colors: {
        honey: {
          50: "#FFF8E7",
          100: "#FCEFC7",
          200: "#F7DFA0",
          300: "#F0C86B",
          400: "#E6B34A",
          500: "#D89A24",
          600: "#B87918",
          700: "#8F5B15",
          800: "#704817",
          900: "#5C3B16",
        },
      },
    },
  },

  plugins: [],
};