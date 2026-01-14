import { defineConfig } from 'tsup';

export default defineConfig([
  // Main entry with 'use client' (includes components)
  {
    entry: {
      index: 'src/index.ts',
      'components/index': 'src/components/index.ts',
    },
    format: ['cjs', 'esm'],
    dts: true,
    clean: true,
    external: ['react', 'react-dom', 'tailwindcss'],
    sourcemap: true,
    banner: {
      js: '"use client";',
    },
  },
  // Server-safe entries - no 'use client' banner
  {
    entry: {
      preset: 'src/preset.ts',
      config: 'src/config.ts',
      'theme/index': 'src/theme/index.ts',
      'utils/index': 'src/utils/index.ts',
    },
    format: ['cjs', 'esm'],
    dts: true,
    clean: false,
    external: ['react', 'react-dom', 'tailwindcss'],
    sourcemap: true,
  },
]);
