/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    fontFamily: {
      sans: ['Inter', 'sans-serif'],
      kanit: ['Kanit', 'sans-serif'],
      serif: ['Merriweather', 'serif'],
      kode: ['Kode Mono', 'monospace']
    },
    extend: {
      colors: {
        'pingpongred': '#D53228',
        'apricot': '#FCBC72',
        'scarlet': '#C42625',
        'palegrey': '#E3E3E3',
        'melon': '#E96C4E',
        'butterscotch': '#E39C34',
        'darkbrown': '#301315',
        'silver': '#BFBFBF'
      }
    },
  },
  plugins: [],
}
