/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: 'red',
        secondary: '#F08E14',
        grayText: '#6B7280',
      },
    },
  },
  plugins: [],
};
