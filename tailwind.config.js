/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['Inter'],
        title: ['Poppins'],
      },
      colors: {
        primary: '#666'
      },
      height: {
        'dvh': '100dvh',
      },
      minHeight: {
        'dvh': '100dvh',
      },
    },
  },
  plugins: [],
}

