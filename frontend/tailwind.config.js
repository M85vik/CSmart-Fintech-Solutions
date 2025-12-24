/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        marquee: 'marquee 25s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
      },

      colors: {
        brandRed: "#DD0303",   // custom color name + hex
        brandBlue: "rgb(30, 64, 175)", // RGB value
        brandGreen: "hsl(142, 76%, 36%)", // HSL value
        brandBeige: "#FEF3E2",
        brandOrange: "#FA812F",
        brandYellow: "#FAB12F",
        brandLightYellow: "#F8B259",
        brandPinkish: "#FFEBE5",
        brandBluish: "#EAF3F9",

        primary: '#1D4ED8',
        secondary: '#10B981',
        dark: '#1F2937',
        light: '#F9FAFB',
        // --- ADD YOUR NEW COLORS HERE ---
        'brand-bg': '#FEF3E2',        // Light Beige background
        'brand-primary': '#FA812F',   // Primary Orange
        'brand-secondary': '#FAB12F', // Secondary Yellow/Gold
        'brand-accent': '#DD0303',    // Accent Red (use sparingly)
        'text-dark': '#333333',       // Dark Charcoal for text
        'text-light': '#555555',      // Lighter grey for subtitles
      },


      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },

    },
  },
  plugins: [require('@tailwindcss/typography'), require('@tailwindcss/line-clamp'),],
}