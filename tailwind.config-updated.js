/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
    "node_modules/flowbite/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: { DEFAULT: '#00171f' },       // dark navy
        secondary: { DEFAULT: '#003459' },     // deep blue
        accent: { DEFAULT: '#007ea7' },        // medium blue
        highlight: { DEFAULT: '#00a8e8' },     // bright cyan
        neutralWhite: { DEFAULT: '#ffffff' },  // white
        paleBlue: { DEFAULT: '#c7dbe6' },      // pale blue added for dashboard
      },
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}
