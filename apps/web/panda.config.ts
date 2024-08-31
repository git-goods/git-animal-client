import { semanticTokens, textStyles, tokens } from '@gitanimals/ui-panda';
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
            transform: 'translateY(20px)',
          },
          to: {
            opacity: 1,
            transform: 'translateY(0)',
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

  syntax: 'object-literal',
  jsxFramework: 'react',

  // The output directory for your css system
  outdir: 'styled-system',

  // delete default presets
  presets: [],
});
