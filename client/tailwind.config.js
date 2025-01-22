/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'gray': '#6a6b6d',
        'menu-lyrics': '#5e5f61',
        'menu-bg': '#242527',
        'green': '#36c492',
        'medium-gray': '#8d8e90',
        'light-gray': '#e0e1e3',
        'dark-gray': '#1d1e20',
      }
    },
  },
  plugins: [],
}