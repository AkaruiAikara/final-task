module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        platinum: "#e5e5e5",
        eerie: "#1a1a1a",
        antiflash: "#f1f1f1",
        smokyblack: "#0e0e0e",
        bleude: "#2e86de",
      },
    },
    fontFamily: {
      summer: ['"Summer Vibes"', "sans-serif"],
      product: ['"Product Sans"', "sans-serif"],
    },
    container: {
      center: true,

      padding: {
        DEFAULT: "1rem",
        sm: "2rem",
        lg: "4rem",
        xl: "5rem",
        "2xl": "6rem",
      },
    },
  },
  plugins: [],
};
