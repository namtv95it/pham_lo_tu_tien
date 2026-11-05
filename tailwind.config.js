/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        xianxia: {
          bg: '#0a0d14',
          card: '#121722',
          border: '#1f293d',
          gold: '#f59e0b',
          qi: '#38bdf8',
          blood: '#ef4444',
          dao: '#a855f7',
        }
      },
      fontFamily: {
        serif: ['"Lora"', '"Noto Serif"', 'serif'],
        sans: ['"Be Vietnam Pro"', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
