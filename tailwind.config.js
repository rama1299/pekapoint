// Gabungan kedua file konfigurasi Tailwind CSS
import forms from '@tailwindcss/forms';
import typography from '@tailwindcss/typography';

const round = num =>
  num
    .toFixed(7)
    .replace(/(\.[0-9]+?)0+$/, '$1')
    .replace(/\.0$/, '');
const em = (px, base) => `${round(px / base)}em`;

export default {
  content: [
    './src/**/*.{html,js,svelte,ts}',
    "./node_modules/flowbite-svelte/**/*.{html,js,svelte,ts}",
  ],
  theme: {
    fontFamily: {
      sans: ['Jost', 'system-ui'],
      inter: ['Inter', 'sans-serif'],
      monst: ['Montserrat', 'sans-serif'],
      roboto: ['Roboto', 'sans-serif'],
      lexend: ['Lexend', 'sans-serif']
    },
    extend: {
      typography: {
        DEFAULT: {
          css: {
            h2: {
              fontSize: em(20, 14),
              marginTop: em(32, 20),
              marginBottom: em(4, 20),
              lineHeight: round(28 / 20)
            },
            blockquote: {
              fontWeight: 'normal',
              fontStyle: 'normal',
              color: '',
              borderLeftWidth: '0.25rem',
              borderLeftColor: 'var(--tw-prose-quote-borders)',
              quotes: ''
            },
            'blockquote p:first-of-type::before': {
              content: ''
            },
            'blockquote p:last-of-type::after': {
              content: ''
            }
          }
        },
        lg: {
          css: {
            h2: {
              fontSize: em(30, 18),
              marginTop: em(56, 30),
              marginBottom: em(4, 20),
              lineHeight: round(40 / 30)
            }
          }
        },
        xl: {
          css: {
            h2: {
              fontSize: em(30, 18),
              marginTop: em(56, 30),
              marginBottom: em(4, 20),
              lineHeight: round(40 / 30)
            }
          }
        }
      },
      colors: {
        primary: { 50: '#FFF5F2', 100: '#FFF1EE', 200: '#FFE4DE', 300: '#FFD5CC', 400: '#FFBCAD', 500: '#FE795D', 600: '#EF562F', 700: '#EB4F27', 800: '#CC4522', 900: '#A5371B'},
      },
      width: {
        'wrap': '81rem'
      },
    }
  },
  darkMode: 'class',
  plugins: [forms, typography, require('flowbite/plugin')]
};
