module.exports = {
  content: [
    "./pages/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./src/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      colors: {
        'neon-green': '#39ff14',
        'bg-deep': '#0A0A0A',
        'panel': '#121212',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
        display: ['Oswald', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
