/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#0f0f10',
        ash: '#f4f4f2',
        stone: '#1a1a1b',
        gold: '#c8a46b',
      },
      fontFamily: {
        display: ['Cormorant Garamond', 'serif'],
        body: ['Manrope', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 16px 48px rgba(0, 0, 0, 0.28)',
      },
    },
  },
  plugins: [],
};
