/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Comfortaa', 'sans-serif'],
      },
      colors: {
        light: {
          background: '#eef2f3',
          text: '#333333',
          primary: '#4a90e2',
        },
        dark: {
          background: '#243B55',
          text: '#ffffff',
          primary: '#63b3ed',
        },
      },
    },
  },
  plugins: [],
};
