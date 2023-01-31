const colors = require('tailwindcss/colors');

function withOpacityValue(variable) {
  return ({ opacityValue }) => {
    if (opacityValue === undefined) {
      return `hsl(var(${variable}))`;
    }
    return `hsl(var(${variable}) / ${opacityValue})`;
  };
}

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    colors: {
      black: colors.black,
      white: colors.white,
      gray: colors.zinc,
      transparent: colors.transparent,

      primary: colors.violet,
      secondary: colors.yellow,
      accent: colors.sky,

      error: colors.red,
      info: colors.blue,
      success: colors.green,
      warning: colors.yellow,
    },
    fontFamily: {
      sans: ['Inter', 'sans-serif'],
    },
    fontSize: {
      xs: ['.75rem', '1.125rem'],
      sm: ['.875rem', '1.25rem'],
      base: ['1rem', '1.5rem'],
      lg: ['1.125rem', '1.75rem'],
      xl: ['1.25rem', '1.875rem'],

      'heading-sm': ['1.25rem', '1.5rem'],
      'heading-md': ['1.5rem', '1.875rem'],
      'heading-lg': ['1.875rem', '2.25rem'],
      'heading-xl': ['2.25rem', '2.75rem'],
      'heading-2xl': ['2.5rem', '3rem'],
    },
    extend: {
      borderColor: {
        input: withOpacityValue('--input-border'),
      },
      opacity: {
        4: 0.04,
        8: 0.08,
        12: 0.12,
        16: 0.16,
        20: 0.2,
      },
    },
  },
  plugins: [],
};
