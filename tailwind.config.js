/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      'xsm': '375px',
      // => @media (min-width: 480px) { ... }

      'sm': '640px',
      // => @media (min-width: 640px) { ... }

      'md': '786px',
      // => @media (min-width: 786px) { ... }

      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }

    },
  },
  plugins: [],
}