/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // Enable class-based dark mode
  content: ['./src/**/*.{html,js,svelte,ts}', './index.html'],
  theme: {
    extend: {
      colors: {
        'brand-lime': '#84cc16',
        'brand-orange': '#f97316',
        'dark-bg': '#1a1a1a',
      }
    }
  },
  plugins: []
}
