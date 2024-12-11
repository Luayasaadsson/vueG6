/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        light: {
          background: '#ffffff',
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
}