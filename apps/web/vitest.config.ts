import { fileURLToPath } from 'node:url';

import { defineConfig } from 'vitest/config';

export default defineConfig({
  resolve: {
    // Mirror the `paths` in tsconfig.json so tests can use the same import
    // aliases as the app. Regex `find` avoids matching scoped packages
    // (e.g. `@gitanimals/...`) that merely start with `@`.
    alias: [
      { find: /^@\//, replacement: fileURLToPath(new URL('./src/', import.meta.url)) },
      { find: /^_panda\//, replacement: fileURLToPath(new URL('./styled-system/', import.meta.url)) },
    ],
  },
  test: {
    environment: 'node',
    include: ['src/**/*.{test,spec}.{ts,tsx}'],
  },
});
