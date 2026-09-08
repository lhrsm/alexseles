/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#1A73E8',      // Google/Windows Sober Tech Blue
          primaryHover: '#1557B0', // Sober Dark Blue
          navy: '#0E1620',         // Executive Dark Background
          slate: '#1E293B',
          red: '#EA4335',          // Cores oficiais do Logo
          yellow: '#FBBC05',
          green: '#34A853',
          blue: '#1A73E8',
        },
        navy: {
          950: '#0E1620', // Hero & Dark sections
          900: '#121C28',
          800: '#163758', // Deep brand blue / text
          700: '#1F476F',
          muted: '#536773',
          subtle: '#63717C',
          light: '#C6D1DA',
        },
        copper: {
          DEFAULT: '#1A73E8', // Mapeado para Sober Tech Blue
          dark: '#1557B0',
          light: '#60A5FA',
          subtle: '#E8F0FE',
        },
        surface: {
          white: '#FFFFFF',
          light: '#F8FAFC', // Neutral off-white sections
          border: '#E2E8F0',
          borderDark: 'rgba(255,255,255,0.18)',
        }
      },
      fontFamily: {
        display: ['"Plus Jakarta Sans"', '"Inter"', 'system-ui', 'sans-serif'],
        sans: ['"Inter"', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
