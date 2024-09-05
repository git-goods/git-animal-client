import { semanticTokens, textStyles, tokens, utilities } from '@gitanimals/ui-panda';
import { defineConfig } from '@pandacss/dev';

export default defineConfig({
  // Whether to use css reset
  preflight: true,

  // Where to look for your css declarations
  include: ['./src/**/*.{ts,tsx}', '../../packages/ui/panda/src/**/*.{ts,tsx}'],

  // Files to exclude
  exclude: [],

  // Useful for theme customization
  theme: {
    extend: {
      tokens,
      semanticTokens,
      textStyles,

      keyframes: {
        fadeIn: {
          from: {
            opacity: 0,
          },
          to: {
            opacity: 1,
          },
        },
        fadeInUp: {
          from: {
            opacity: 0,
            transform: 'translateY(20px)',
          },
          to: {
            opacity: 1,
            transform: 'translateY(0)',
          },
        },
        jump: {
          '0%': {
            transform: 'translateY(0)',
          },
          '50%': {
            transform: 'translateY(-10px)',
          },
          '100%': {
            transform: 'translateY(0)',
          },
        },
        bounce: {
          '0%, 20%, 50%, 80%, 100%': {
            transform: 'translateY(0)',
          },
          '40%': {
            transform: 'translateY(-30px)',
          },
          '60%': {
            transform: 'translateY(-20px)',
          },
        },
        move: {
          '0%': {
            rotate: '-2deg',
          },
          '50%': {
            rotate: '2deg',
          },
          '100%': {
            rotate: '-2deg',
          },
        },
        move_5: {
          '0%': {
            rotate: '-5deg',
          },
          '50%': {
            rotate: '5deg',
          },
          '100%': {
            rotate: '-5deg',
          },
        },
      },
    },
  },
  conditions: {
    extend: {
      mobile: '@media (max-width: 768px)',
    },
  },
  utilities: {
    extend: utilities,
  },
  syntax: 'object-literal',
  jsxFramework: 'react',

  // The output directory for your css system
  outdir: 'styled-system',

  // delete default presets
  presets: [],
});
