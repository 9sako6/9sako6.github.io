module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      width: {
        "2xl": "42rem",
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
