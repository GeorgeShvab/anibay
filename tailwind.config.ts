import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        card: 'rgb(var(--card) / <alpha-value>)',
        //
        black: {
          DEFAULT: 'rgb(var(--black) / <alpha-value>)',
        },
        red: {
          DEFAULT: 'rgb(var(--red) / <alpha-value>)',
          light: 'rgb(var(--red-light) / <alpha-value>)',
          dark: 'rgb(var(--red-dark) / <alpha-value>)',
        },
        dark: {
          DEFAULT: 'rgb(var(--dark) / <alpha-value>)',
          light: 'rgb(var(--dark-light) / <alpha-value>)',
          dark: 'rgb(var(--dark-dark) / <alpha-value>)',
        },
        grey: {
          DEFAULT: 'rgb(var(--grey) / <alpha-value>)',
        },
      },
      padding: {
        header: 'var(--header-height)',
      },
      backgroundColor: {
        light: '#4a4a4a',
      },
      fontFamily: {
        rubik: 'Rubik, sans-serif',
        logo: 'Bangers, cursive',
      },
      height: {
        'screen-intro': 'var(--screen-intro)',
        20: '20rem',
        120: '30rem',
        footer: 'calc(100vh - var(--footer-height))',
      },
      width: {
        120: '30rem',
      },
      boxShadow: {
        popup: '0 0 150px 50px rgba(0, 0, 0, 1)',
        light: '0 0 5px 0 rgba(255, 255, 255, 0.2)',
        red: '0 0 5px 0 rgb(var(--red))',
      },
      zIndex: {
        '1-': '-1',
      },
      transitionProperty: {
        width: 'transition width',
      },
      fontSize: {
        '2xs': '0.5rem',
        '0.5xs': '0.825rem',
      },
    },
  },
  plugins: [],
}

export default config
