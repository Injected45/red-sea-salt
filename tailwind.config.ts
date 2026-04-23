import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f0f7fb',
          100: '#dcebf4',
          200: '#b7d5e6',
          300: '#85b5d2',
          400: '#4e8eb5',
          500: '#2f6f97',
          600: '#1f567b',
          700: '#1a4663',
          800: '#183a51',
          900: '#0f2537',
        },
        accent: {
          DEFAULT: '#d9a441',
          dark: '#b38532',
          light: '#e7c179',
        },
        ivory: {
          50: '#fdfbf6',
          100: '#f8f2e4',
          200: '#efe4c8',
        },
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'Georgia', 'serif'],
        arabic: ['var(--font-arabic)', 'Tajawal', 'system-ui', 'sans-serif'],
      },
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          md: '2rem',
          lg: '3rem',
        },
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'float-slow': {
          '0%, 100%': { transform: 'translateY(0) translateX(0)' },
          '50%': { transform: 'translateY(-14px) translateX(6px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'marquee-rtl': {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 700ms cubic-bezier(0.2, 0.7, 0.2, 1) both',
        'fade-in': 'fade-in 800ms ease-out both',
        'float-slow': 'float-slow 8s ease-in-out infinite',
        shimmer: 'shimmer 3s linear infinite',
        marquee: 'marquee 40s linear infinite',
        'marquee-rtl': 'marquee-rtl 40s linear infinite',
      },
      backgroundImage: {
        'grain': "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 0.05 0 0 0 0 0.08 0 0 0 0 0.12 0 0 0 0.25 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
      },
    },
  },
  plugins: [],
};

export default config;
