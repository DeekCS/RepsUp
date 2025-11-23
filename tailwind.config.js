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
        // Design System Colors
        fadedOrange: '#FF8643',
        dustyGrey: '#A79D95',
        vistaWhite: '#FEF3F6',
        birch: '#3D3D26',
        dustyGreyAlt: '#A39499',
        merino: '#F8E6E4',
        nobel: '#B3B2B0',
        greenWhite: '#EAE8E4',
        chilliPepper: '#C81213',
        
        // Semantic aliases
        primary: {
          DEFAULT: '#FF8643',
          50: '#FFF5EF',
          100: '#FFEBDF',
          500: '#FF8643',
          600: '#FF6F1F',
          700: '#E85500',
        },
        secondary: {
          DEFAULT: '#3D3D26',
          50: '#F5F5F3',
          500: '#3D3D26',
          600: '#2A2A1A',
        },
        error: {
          DEFAULT: '#C81213',
          50: '#FEF2F2',
          500: '#C81213',
          600: '#A00F10',
        },
      },
      spacing: {
        // Grid system spacing
        'grid-margin': '16px',
        'grid-gutter': '20px',
        
        // Safe area
        "safe-top": "max(1.5rem, var(--safe-area-inset-top))",
        "safe-bottom": "max(1.5rem, var(--safe-area-inset-bottom))",
        "safe-left": "max(1.5rem, var(--safe-area-inset-left))",
        "safe-right": "max(1.5rem, var(--safe-area-inset-right))",
      },
      fontFamily: {
        sans: ['DMSans-Regular', 'system-ui', '-apple-system', 'sans-serif'],
        medium: ['DMSans-Medium'],
        bold: ['DMSans-Bold'],
      },
    },
  },
  plugins: [],
};
