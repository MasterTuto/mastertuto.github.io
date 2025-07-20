/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['Inter']
      },
      colors: {
        primary: '#666'
      }
    },
  },
  plugins: [],
}

