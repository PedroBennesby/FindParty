/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.tsx', './index.html'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      backgroundImage: {
        background: "url('/background.png')",
        'gradient': 'linear-gradient(89.86deg, #9572FC 43.08%, #43E7AD 83.94%, #E1D55D 24.57%)',
        'game-gradient': 'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.9) 67.08%)',
      },
    },
  },
  plugins: [],
};
