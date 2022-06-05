module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "food": " url('/assets/food.svg')"
      },
    },
  },
  plugins: [require("daisyui")],
}
