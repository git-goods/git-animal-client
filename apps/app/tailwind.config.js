const { colors } = require('@gitanimals/ui-tailwind/theme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{ts,tsx}', './src/**/*.{ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors,
      fontFamily: {
        body: ['Galmuri11'],
      },
    },
    borderRadius: { none: '0' },
    boxShadow: {},
    backgroundImage: {},
  },
  plugins: [],
};
