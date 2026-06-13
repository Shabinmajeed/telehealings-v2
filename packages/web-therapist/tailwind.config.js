export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: { 500: '#3b82f6', 600: '#2563eb' },
        brand: { DEFAULT: '#387bd4', dark: '#1e5ab8' },
      },
      fontFamily: { sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'] },
    },
  },
  plugins: [],
};
