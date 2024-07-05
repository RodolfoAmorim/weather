/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Barlow', 'sans-serif'],
      },
      boxShadow: {
        cold: '0 0 96px 0 rgba(14, 165, 233, .8)',
        box: '0 5.5px 5.5px 0 rgba(0, 0, 0, 0.25)',
      },
    },
  },
  plugins: [],
}
