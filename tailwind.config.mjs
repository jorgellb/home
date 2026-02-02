import { fontFamily } from 'tailwindcss/defaultTheme';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-space-grotesk)', ...fontFamily.sans],
        display: ['var(--font-bebas-neue)', ...fontFamily.sans],
      },
      fontSize: {
        xs: ['0.75rem', { lineHeight: '1rem' }],     // 12px
        sm: ['0.875rem', { lineHeight: '1.25rem' }],  // 14px
        base: ['1rem', { lineHeight: '1.5rem' }],     // 16px
        lg: ['1.125rem', { lineHeight: '1.75rem' }],  // 18px
        xl: ['1.25rem', { lineHeight: '1.75rem' }],   // 20px
        '2xl': ['1.5rem', { lineHeight: '2rem' }],    // 24px
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }], // 30px
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],   // 36px
        '5xl': ['3rem', { lineHeight: '1' }],          // 48px
        '6xl': ['3.75rem', { lineHeight: '1' }],        // 60px
        '7xl': ['4.5rem', { lineHeight: '1' }],         // 72px
      },
      colors: {
        yellow: {
          50: '#FFFBE8',  // Primary background (warm cream)
          100: '#FFF9D1',
          200: '#FFF0B0',
          300: '#FDF285',
          400: '#FAFF7F',  // Bright yellow accent
          500: '#FFF055',  // Primary CTA
          600: '#BDAE42',
          700: '#7A6C2E',
          800: '#5A5024',
          900: '#302A15',
        },
        golden: {
          50: '#FFFBE6',
          100: '#FFF4D6',
          200: '#FFEBB3',
          300: '#FFD980',
          400: '#FFEB8F',
          500: '#FFE56A',
        },
        nature: {
          50: '#F6FDEA',
          100: '#F2FFE6',
          200: '#E4F9BF',
          300: '#DBFB8E',
          400: '#C2E57D',  // Success/accent
          500: '#88B55E',
          600: '#506B3A',
          700: '#3B502B',
          800: '#27361D',
          900: '#1A2711',
        },
        green: {
          50: '#F4FBF0',
          100: '#E8F8D8',
          200: '#D4E6BC',
          300: '#8AD753',  // Vibrant green
          400: '#69B93A',
          500: '#577B32',
          600: '#30451E',
        },
        blue: {
          50: '#F6FAFF',
          100: '#F0FCFF',
          200: '#E0F4FF',
          300: '#A3D7FF',  // Light blue cards
          400: '#69BBFF',
          500: '#508DC1',
          600: '#3977A9',
          700: '#18426A',
          800: '#12304E',
          900: '#0D1A26',
        },
        dark: {
          50: '#ECECEC',
          100: '#D6D6D6',
          200: '#BFBFBF',
          300: '#808080',
          400: '#404040',
          500: '#2A2A2A',
          600: '#262626',  // Primary text
          700: '#1E1E1E',
          800: '#131314',
          900: '#0C0C0C',
          950: '#000000',
        },
        brown: {
          50: '#F6F0E9',
          100: '#FFF5E1',
          200: '#E1D3BC',
          300: '#BFA28D',
          400: '#998777',
          500: '#49413C',
          600: '#6E6258',
          700: '#615951',
          800: '#2E2925',
          900: '#120D0A',
        },
        snow: '#FDFEF0',  // Alternative background
      },
      borderRadius: {
        '3xl': '24px',  // Hero panels (like Polyfly)
      },
      boxShadow: {
        'xs': '0 1px 2px 0 rgb(0 0 0 / 0.05)',
        'xs-lg': '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
      },
      animation: {
        'marquee': 'marquee 30s linear infinite',
        'rotate': 'rotateKeyframes 2s linear infinite',
        'bounce': 'bounceKeyframes 2s ease-in-out infinite',
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'fade-out': 'fadeOut 0.3s ease-in-out',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        rotateKeyframes: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        bounceKeyframes: {
          '0%, 100%': { transform: 'scale(0)' },
          '50%': { transform: 'scale(0.75)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeOut: {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
  ],
};
