/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      screens: {
        '4k-screen' : '1900px'
      },
      colors: {
        red: {
          300: '#FCA5A5',
          400: '#F87171',
        },
        orange: {
          300: '#FDBA74',
          400: '#FB923C',
        },
        yellow: {
          300: '#FCD34D',
          400: '#FBBF24',
        },
        green: {
          300: '#86EFAC',
          400: '#4ADE80',
        },
        blue: {
          300: '#93C5FD',
          400: '#60A5FA',
        },
        indigo: {
          300: '#A5B4FC',
          400: '#818CF8',
        },
      },
      safelist: [
        'from-red-300', 'to-red-400', 'shadow-red-400',
        'from-orange-300', 'to-orange-400', 'shadow-orange-400',
        'from-yellow-300', 'to-yellow-400', 'shadow-yellow-400',
        'from-green-300', 'to-green-400', 'shadow-green-400',
        'from-blue-300', 'to-blue-400', 'shadow-blue-400',
        'from-indigo-300', 'to-indigo-400', 'shadow-indigo-400',
      ],
      fontFamily: {
        'merriweather': ['Merriweather', 'serif'],
        'nunito': ['Nunito', 'sans-serif']
      },
    },
  },
  plugins: [],
}

