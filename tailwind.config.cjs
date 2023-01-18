/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontSize: {
        xxxs: '9px',
        xxs: '11px',
      },
      width: {
        84: '336px',
        90: '360px',
        120: '480px',
        156: '624px',
        168: '672px',
        180: '720px',
        192: '768px',
      },
      height: {
        120: '480px',
      }
    },
  },
  plugins: [require('@tailwindcss/line-clamp')],
};
