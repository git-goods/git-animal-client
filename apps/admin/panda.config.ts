import { semanticTokens, textStyles, tokens } from '@gitanimals/ui-panda';
import { defineConfig } from '@pandacss/dev';

export default defineConfig({
  presets: ['@shadow-panda/preset'],

  // Whether to use css reset
  preflight: true,

  // Where to look for your css declarations
  include: [
    './app/routes/**/*.{ts,tsx,js,jsx}',
    './app/components/**/*.{ts,tsx,js,jsx}',
    '../../packages/ui/panda/src/**/*.{ts,tsx}',
  ],

  // Files to exclude
  exclude: [],

  // Useful for theme customization
  theme: {
    extend: {
      tokens,
      semanticTokens,
      textStyles,
    },
  },
  jsxFramework: 'react',

  // The output directory for your css system
  // outdir: 'styled-system',
  emitPackage: true,
  outdir: 'styled-system',
});
