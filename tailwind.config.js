/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'cornflower-blue': '#6495ED',
        'light-yellow': '#FFE5B4',
        'coral-green': '#50C878',
        'coral-red': '#FF4040',
      },
    },
  },
  plugins: [],
};