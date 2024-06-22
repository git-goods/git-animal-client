import { semanticTokens, tokens } from '@gitanimals/ui-panda';
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
    },
  },
  jsxFramework: 'react',

  // The output directory for your css system
  outdir: 'styled-system',

  // delete default presets
  presets: [],
});
