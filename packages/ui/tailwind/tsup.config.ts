import { defineConfig } from 'tsup';

export default defineConfig({
  entry: {
    index: 'src/index.ts',
    preset: 'src/preset.ts',
    config: 'src/config.ts',
    'theme/index': 'src/theme/index.ts',
    'components/index': 'src/components/index.ts',
  },
  format: ['cjs', 'esm'],
  dts: true,
  clean: true,
  external: ['react', 'react-dom', 'tailwindcss'],
  sourcemap: true,
});
