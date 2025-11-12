/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-bg': '#010A13',
        'brand-surface': '#0A1428',
        'brand-primary': '#0BC6E3',
        'brand-secondary': '#09819A',
        'brand-text': '#C8D4E4',
        'brand-text-secondary': '#818E9F',
      },
    },
  },
  plugins: [],
}
