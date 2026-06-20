import { defineConfig } from 'tsup';

// PR0 범위에서는 컴포넌트가 없어 모든 엔트리가 server-safe 다('use client' 불필요).
// 컴포넌트를 슬라이스에서 추가할 때 'use client' 번들 엔트리를 다시 분리한다(ADR-003).
export default defineConfig({
  entry: {
    index: 'src/index.ts',
    preset: 'src/preset.ts',
    config: 'src/config.ts',
    'theme/index': 'src/theme/index.ts',
    'utils/index': 'src/utils/index.ts',
  },
  format: ['cjs', 'esm'],
  dts: true,
  clean: true,
  external: ['react', 'react-dom', 'tailwindcss'],
  sourcemap: true,
});
