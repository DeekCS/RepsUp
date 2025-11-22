/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#f0f9ff",
          100: "#e0f2fe",
          500: "#0ea5e9",
          600: "#0284c7",
          700: "#0369a1",
        },
        secondary: {
          50: "#f8fafc",
          500: "#64748b",
          600: "#475569",
        },
      },
      spacing: {
        "safe-top": "max(1.5rem, var(--safe-area-inset-top))",
        "safe-bottom": "max(1.5rem, var(--safe-area-inset-bottom))",
        "safe-left": "max(1.5rem, var(--safe-area-inset-left))",
        "safe-right": "max(1.5rem, var(--safe-area-inset-right))",
      },
    },
  },
  plugins: [],
};
