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
        'sekunder': {
          '50': '#f8f8f8',
          '100': '#efefef',
          '200': '#dcdcdc',
          '300': '#bdbdbd',
          '400': '#989898',
          '500': '#7c7c7c',
          '600': '#656565',
          '700': '#525252',
          '800': '#464646',
          '900': '#3d3d3d',
          '950': '#292929',
      },      
        'accent-red': {
          '50': '#fef2f2',
          '100': '#fee2e2',
          '200': '#fecaca',
          '300': '#fca5a5',
          '400': '#f87171',
          '500': '#ef4444',
          '600': '#df3737',
          '700': '#b91c1c',
          '800': '#991b1b',
          '900': '#7f1d1d',
          '950': '#450a0a',
      },
      'accent-blue': {
        '50': '#f0f7ff',
        '100': '#e0eefe',
        '200': '#b9dcfe',
        '300': '#7cc1fd',
        '400': '#36a2fa',
        '500': '#0c86eb',
        '600': '#0062bd',
        '700': '#0152a3',
        '800': '#064786',
        '900': '#0b3c6f',
        '950': '#07264a',
    },    
      'primary': {
        '50': '#ffffe7',
        '100': '#fdffc1',
        '200': '#fffe86',
        '300': '#fff541',
        '400': '#ffe70d',
        '500': '#fed700',
        '600': '#d19f00',
        '700': '#a67202',
        '800': '#89580a',
        '900': '#74480f',
        '950': '#442604',
    },    
      },
      width: {
        'wrap': '81rem'
      },
    }
  },
  darkMode: 'class',
  plugins: [forms, typography, require('flowbite/plugin')]
};
