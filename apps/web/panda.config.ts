import { keyframes, semanticTokens, textStyles, tokens } from '@gitanimals/ui-panda';
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
      keyframes,
    },
  },
  patterns: {
    extend: {
      onlyMobile: {
        description: '모바일에서만 보이는 요소',
        properties: {
          display: { type: 'string' },
        },
        transform(props) {
          return {
            display: props.display ?? 'block',
            '@media (min-width: 768px)': {
              display: 'none',
            },
          };
        },
      },
      onlyDesktop: {
        description: '데스크톱에서만 보이는 요소',
        properties: {
          display: { type: 'string' },
        },
        transform(props) {
          return {
            display: 'none',
            '@media (min-width: 768px)': {
              display: props.display ?? 'block',
            },
          };
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
  presets: ['@shadow-panda/preset'],
});
