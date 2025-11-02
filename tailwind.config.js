/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./resources/**/*.blade.php",
    "./resources/**/*.js",
    "./resources/**/*.vue",
    "./views/**/*.php",
    "./node_modules/flowbite/**/*.js"
  ],
  safelist: [
    // Ensure animation utilities aren't purged if used conditionally
    'animate-bounce',
    'animate-spin',
    'animate-ping',
    'animate-pulse',
  ],
  theme: {
    extend: {
      screens: {
        'md': '868px', // Changed from 768px for iPad Mini compatibility
      },
             colors: {
               brand: {
                 orange: {
                   light: '#E64A00',  // Ciemniejszy jasny pomarańczowy
                   main: '#FF5500',   // Główny pomarańczowy
                   dark: '#CC3F00'    // Ciemny pomarańczowy
                 },
                 navy: {
                   light: '#29404D',  // Jasny navy
                   main: '#000A2E',   // Główny navy
                   dark: '#001122'    // Ciemny navy
                 },
                 white: '#FFFFFF'
               }
             },
      fontFamily: {
        sans: ['Poppins', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
