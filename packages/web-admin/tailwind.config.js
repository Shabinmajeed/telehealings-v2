/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff', 100: '#dbeafe', 200: '#bfdbfe', 300: '#93c5fd',
          400: '#60a5fa', 500: '#3b82f6', 600: '#2563eb', 700: '#1d4ed8',
          800: '#1e40af', 900: '#1e3a8a',
        },
        brand: { DEFAULT: '#387bd4', dark: '#1e5ab8', hover: '#2361b5' },
        surface: { DEFAULT: '#ffffff', alt: '#f8fafc', secondary: '#f1f5f9' },
        text: { main: '#1a293b', muted: '#64748b', soft: '#94a3b8', dark: '#0f172a' },
        border: { DEFAULT: '#e2e8f0', light: '#f1f5f9' },
        success: '#10b981', danger: '#ef4444', warning: '#f59e0b',
      },
      fontFamily: { sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'] },
      borderRadius: { sm: '6px', DEFAULT: '8px', md: '12px', lg: '16px', xl: '24px', full: '9999px' },
      boxShadow: {
        sm: '0 1px 2px rgba(0,0,0,0.05)', DEFAULT: '0 4px 6px rgba(0,0,0,0.05)',
        md: '0 10px 15px rgba(0,0,0,0.08)', lg: '0 20px 25px rgba(0,0,0,0.1)',
        card: '0 4px 15px rgba(0,0,0,0.02)', dropdown: '0 10px 30px rgba(0,0,0,0.1)',
      },
    },
  },
  plugins: [],
};
