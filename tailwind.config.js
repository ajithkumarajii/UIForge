/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'selector',
  theme: {
    extend: {
      colors: {
        dark: {
          bg: '#09090B',
          'bg-secondary': '#141319',
          'bg-tertiary': '#17171C',
        },
        light: {
          bg: '#ffffff',
          'bg-secondary': '#f3f4f6',
          'bg-tertiary': '#e5e7eb',
        }
      },
      backgroundImage: {
        'gradient-dark': 'linear-gradient(135deg, #09090B 0%, #0f0f14 50%, #09090B 100%)',
        'gradient-light': 'linear-gradient(135deg, #f8f9fa 0%, #f3f4f6 50%, #f8f9fa 100%)',
      }
    },
  },
  plugins: [],
}
