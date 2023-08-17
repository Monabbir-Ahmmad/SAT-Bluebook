import theme from "tailwindcss/colors";

const themeColors = {
  "text-color": "var(--text-color)",
  primary: "var(--primary-color)",
};

module.exports = {
  mode: "jit",
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: themeColors,
    },
  },
  plugins: [],
};
