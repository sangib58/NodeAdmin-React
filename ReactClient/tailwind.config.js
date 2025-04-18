/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens:{
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    },
    extend: {
      fontFamily:{
        'inter': ["'Inter'", 'sans-serif']
      },
      colors:{
        'light-gray':'#F5F5F5',
        'ultra-light-gray':'#F0F0F0',
        'dark-gray':'#424242',
        'dusk-gray':'#CECECE',
        'dark-black':'#1E1E1E',
        'superLight-gray':'#E0E0E0'
      }
    },
  },
  plugins: [],
}