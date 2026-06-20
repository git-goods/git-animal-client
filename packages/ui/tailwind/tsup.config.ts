import { defineConfig } from 'tsup';

export default defineConfig([
  // 'use client' 가 필요한 컴포넌트 엔트리
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
  // server-safe 엔트리 ('use client' 없음) — preset/config 는 Node 런타임(Tailwind)에서 로드
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
