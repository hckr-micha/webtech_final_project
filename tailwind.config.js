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
        darkGreen: 'rgb(7, 17, 8)',
        slateGray: 'rgb(54, 70, 82)',
        lavenderGray: 'rgb(191, 177, 193)',
        lightGray: 'rgb(181, 190, 198)',
        paleBlue: 'rgb(199, 219, 230)',
      },
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}
