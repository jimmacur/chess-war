/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  safelist: [
    "text-red-500",
    "text-4xl",
    "font-bold",
    "bg-gray-900",
    "min-h-screen",
    "flex",
    "items-center",
    "justify-center",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};