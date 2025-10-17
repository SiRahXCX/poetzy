/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontSize: {
        sm: 10,
        base: 12,
        lg: 14,
        xl: 16
      }
    },
  },
  plugins: [],
}