/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      'WorkSans': ['Work Sans', 'sans-serif'],
      'Montserrat': ['Montserrat', 'sans-serif'],
      'SpaceGrotesk': ['Space  Grotesk', 'sans-serif']


    },
    colors: {
        primary: '#3063E9',
        white:'#ffff'
    }
  },
  plugins: [
    require('tailwind-scrollbar-hide')
  ],
}
