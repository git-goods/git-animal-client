import { defineConfig } from '@pandacss/dev';
import { tokens, semanticTokens, textStyles, media } from './src/theme';

export default defineConfig({
  // Whether to use css reset
  preflight: true,

  // Where to look for your css declarations
  include: ['./src/**/*.{ts,tsx}'],

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
  conditions: {
    extend: {
      mobile: media.mobile,
      desktop: media.desktop,
    },
  },

  // utilities: {
  //   extend: utilities,
  // },
  outExtension: 'js',
  jsxFramework: 'react',

  // The output directory for your css system
  outdir: 'styled-system',

  // delete default presets
  presets: ['@shadow-panda/preset'],
});
