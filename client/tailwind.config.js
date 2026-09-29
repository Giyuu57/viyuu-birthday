/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        cream: '#FBF5EE',
        paper: '#FFFCF8',
        blush: {
          DEFAULT: '#F6D9E2',
          deep: '#EFC0D0',
        },
        lavender: {
          DEFAULT: '#E5DAF3',
          deep: '#D5C3EE',
        },
        rose: {
          DEFAULT: '#C0728F',
          deep: '#A8577A',
        },
        plum: {
          DEFAULT: '#4B3A50',
          soft: '#7A6580',
        },
        gold: '#E8CBA0',
        night: {
          DEFAULT: '#241931',
          deep: '#150F20',
        },
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'serif'],
        body: ['Lora', 'serif'],
        script: ['Caveat', 'cursive'],
      },
      boxShadow: {
        soft: '0 10px 40px rgba(75,58,80,0.12)',
      },
      keyframes: {
        flicker: {
          '0%, 100%': { transform: 'scaleY(1) rotate(-1deg)' },
          '50%': { transform: 'scaleY(1.12) rotate(2deg)' },
        },
        drift: {
          '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
          '50%': { transform: 'translateY(-16px) rotate(8deg)' },
        },
        twinkle: {
          '0%, 100%': { opacity: 0.15 },
          '50%': { opacity: 0.95 },
        },
      },
      animation: {
        flicker: 'flicker 1.6s ease-in-out infinite',
        drift: 'drift 9s ease-in-out infinite',
        twinkle: 'twinkle 3s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
