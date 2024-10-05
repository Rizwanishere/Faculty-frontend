/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html","./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
      'primary': '#1E3A8A', // Indigo
      'secondary': '#3B82F6', // Blue
      'tertiary': '#64748B', // Cool Gray
      },
    },
  },
  plugins: [],
}

