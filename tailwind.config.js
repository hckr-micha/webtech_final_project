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
        primary: '#2563eb',       // bg-blue-600 / text-blue-600
        accent: '#10b981',        // bg-emerald-500
        secondary: '#7c3aed',     // bg-purple-600
        darkGray: '#1f2937',      // bg-gray-800 / text-gray-800
        lightGray: '#f3f4f6',     // bg-gray-100 / text-gray-100
        neutralWhite: '#ffffff',  // bg-white / text-white
        alertRed: '#ef4444',      // bg-red-500
        chartYellow: '#f59e0b',  // bg-yellow-500
        },
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}
