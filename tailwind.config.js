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
        background: 'rgb(244, 242, 242)',
        foreground: '#444a51',
        'foreground-emphasis': '#7a70e1',
        'foreground-light': '#b9bbc2',

        primary: "#151c25",
        'primary-foreground': "#e0e1df",
        'primary-border': "#1f242e",

        surface: 'rgb(250, 250, 250)',
        'surface-decoration': '#eaebf9',
        'surface-decoration-foreground': '#646cfa',

        'secondary-surface': '#141a25',
        'secondary-surface-foreground': '#e3e4e5',
        'secondary-surface-foreground-light': '#8b9198',
      },
      height: {
        'dvh': '100dvh',
      },
      spacing: {
        '46': '11.5rem',
      },
      minHeight: {
        'dvh': '100dvh',
      },
      listStyleImage: {
        'check-icon': 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'currentColor\' stroke-linecap=\'round\' stroke-linejoin=\'round\' style=\'stroke-width:var(--ng-icon__stroke-width, 2)\'%3E%3Cpath stroke=\'none\' d=\'M0 0h24v24H0z\' fill=\'none\'%3E%3C/path%3E%3Cpath d=\'M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0\'%3E%3C/path%3E%3Cpath d=\'M9 12l2 2l4 -4\'%3E%3C/path%3E%3C/svg%3E")'
      }
    },
  },
  plugins: [],
}
