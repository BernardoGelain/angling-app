/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx,ts,tsx}',
    './src/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#ffffff',
        foreground: '#0a0a0a',
        card: {
          DEFAULT: '#ffffff',
          foreground: '#0a0a0a',
        },
        primary: {
          DEFAULT: '#0f172a',
          foreground: '#f8fafc',
        },
        secondary: {
          DEFAULT: '#f1f5f9',
          foreground: '#0f172a',
        },
        muted: {
          DEFAULT: '#f1f5f9',
          foreground: '#64748b',
        },
        accent: {
          DEFAULT: '#f1f5f9',
          foreground: '#0f172a',
        },
        destructive: {
          DEFAULT: '#ef4444',
          foreground: '#f8fafc',
        },
        border: '#e2e8f0',
        input: '#e2e8f0',
        'input-background': '#ffffff',
        ring: '#0f172a',
        'water-blue': '#3b82f6',
        'water-light': '#93c5fd',
        'lake-dark': '#1e3a8a',
        'trophy-gold': '#fbbf24',
        'xp-green': '#10b981',
      },
      borderRadius: {
        lg: '12px',
        md: '8px',
        sm: '4px',
      },
    },
  },
  plugins: [],
};