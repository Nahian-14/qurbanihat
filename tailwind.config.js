/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          50:  "#f2f7f0",
          100: "#deecd9",
          200: "#b9d6b0",
          300: "#8dba82",
          400: "#5f9a52",
          500: "#3f7d33",
          600: "#2e6323",
          700: "#254f1c",
          800: "#1e3f17",
          900: "#163012",
        },
        amber: {
          50:  "#fefbf0",
          100: "#fdf3d0",
          200: "#fbe49e",
          300: "#f8cf62",
          400: "#f5b830",
          500: "#e89e10",
          600: "#c47c0a",
          700: "#9b5e09",
          800: "#7a480b",
          900: "#5e380d",
        },
      },
      fontFamily: {
        display: ["Georgia", "serif"],
        body:    ["system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};