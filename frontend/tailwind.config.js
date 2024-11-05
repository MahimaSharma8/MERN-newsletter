/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        vine: "#1E0505",
        offWhite: "#FFF2E1",
      },
      fontFamily: {
        serif: ['Noto Serif', 'serif'],
      },
    },
  },
  plugins: [],
};
