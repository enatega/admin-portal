import type { Config } from 'tailwindcss';
const { fontFamily } = require('tailwindcss/defaultTheme');

const config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  // content: ["app/**/*.{ts,tsx}", "components/**/*.{ts,tsx}"],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },

    extend: {
      transitionProperty: {
        // Customize or disable transition properties
        none: 'none',
      },
      colors: {
        'primary-color': '#5AC12F',
        'secondary-border-color': '#111827',
      },
      width: {
        'custom-button': '110px',
        'app-bar-search-width': '408px',
      },
      height: {
        'custom-button': '45px',
      },
      fontSize: {
        'heading-1': '20px',
        'card-h1': '16px',
        'card-h2': '',
        'btn-h': '',
      },
    },
  },
  plugins: [],
} satisfies Config;

export default config;
