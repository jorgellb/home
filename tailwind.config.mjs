import { fontFamily } from 'tailwindcss/defaultTheme';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['Bricolage Grotesque', ...fontFamily.sans],
        editorial: ['Instrument Serif', ...fontFamily.serif],
        body: ['DM Sans', ...fontFamily.sans],
        mono: ['JetBrains Mono', ...fontFamily.mono],
      },
      colors: {
        brutal: {
          // Sustratos
          bg: '#F5F1EA',        // papel cálido
          'bg-alt': '#EFE9DF',  // papel sombra
          card: '#FFFCF6',      // crudo más claro
          surface: '#E7E0D2',   // textura
          ink: '#0E0D0B',       // tinta carbón
          'ink-soft': '#26221E',
          paper: '#FFFCF6',
          // Texto
          text: '#0E0D0B',
          'text-secondary': '#4A453F',
          'text-muted': '#857F76',
          'text-inverse': '#F5F1EA',
          // Acentos
          accent: '#FF5A00',           // naranja Plátano
          'accent-hover': '#E04E00',
          'accent-soft': '#FFE9DA',
          lime: '#D6FF44',             // lima neón (secundario)
          'lime-soft': '#F2FFC6',
          // Bordes
          border: '#0E0D0B',           // sí, negro por defecto (brutalismo)
          'border-soft': '#D3CBBC',
          'border-accent': '#FF5A00',
        },
      },
      fontSize: {
        'display-2xs': ['clamp(2rem, 6vw, 3rem)', { lineHeight: '0.92', letterSpacing: '-0.03em' }],
        'display-xs':  ['clamp(2.5rem, 8vw, 4rem)', { lineHeight: '0.9', letterSpacing: '-0.035em' }],
        'display-sm':  ['clamp(3rem, 9vw, 5rem)', { lineHeight: '0.88', letterSpacing: '-0.04em' }],
        'display-md':  ['clamp(3.5rem, 10vw, 6.5rem)', { lineHeight: '0.86', letterSpacing: '-0.04em' }],
        'display-lg':  ['clamp(4rem, 12vw, 8rem)', { lineHeight: '0.84', letterSpacing: '-0.045em' }],
        'display-xl':  ['clamp(4.5rem, 16vw, 12rem)', { lineHeight: '0.82', letterSpacing: '-0.05em' }],
      },
      letterSpacing: {
        'meta': '0.18em',
        'tightest': '-0.05em',
      },
      boxShadow: {
        'brutal-xs':  '2px 2px 0 0 #0E0D0B',
        'brutal-sm':  '4px 4px 0 0 #0E0D0B',
        'brutal-md':  '6px 6px 0 0 #0E0D0B',
        'brutal-lg':  '10px 10px 0 0 #0E0D0B',
        'brutal-xl':  '14px 14px 0 0 #0E0D0B',
        'brutal-acc-sm':  '4px 4px 0 0 #FF5A00',
        'brutal-acc-md':  '6px 6px 0 0 #FF5A00',
        'brutal-acc-lg':  '10px 10px 0 0 #FF5A00',
        'brutal-lime-sm': '4px 4px 0 0 #D6FF44',
        'brutal-lime-md': '6px 6px 0 0 #D6FF44',
        'brutal-inset':   'inset 0 0 0 2px #0E0D0B',
      },
      borderWidth: {
        '3': '3px',
      },
      animation: {
        'marquee': 'marquee 28s linear infinite',
        'marquee-slow': 'marquee 60s linear infinite',
        'marquee-reverse': 'marqueeReverse 36s linear infinite',
        'reveal-up': 'revealUp 0.9s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'reveal': 'reveal 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'pulse-dot': 'pulseDot 2s ease-in-out infinite',
        'blink': 'blink 1.2s steps(2) infinite',
        'float': 'float 8s ease-in-out infinite',
        'tick': 'tick 1s steps(1) infinite',
      },
      keyframes: {
        marquee: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
        marqueeReverse: {
          from: { transform: 'translateX(-50%)' },
          to: { transform: 'translateX(0)' },
        },
        reveal: { from: { opacity: '0' }, to: { opacity: '1' } },
        revealUp: {
          from: { opacity: '0', transform: 'translateY(28px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        pulseDot: {
          '0%, 100%': { transform: 'scale(1)', opacity: '1' },
          '50%': { transform: 'scale(1.4)', opacity: '0.55' },
        },
        blink: {
          '0%, 50%': { opacity: '1' },
          '51%, 100%': { opacity: '0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        tick: {
          '50%': { opacity: '0.4' },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
  ],
};
