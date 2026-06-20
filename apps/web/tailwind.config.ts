import { createGitAnimalsConfig } from '@gitanimals/ui-tailwind/config';
import type { Config } from 'tailwindcss';

const config: Config = createGitAnimalsConfig(['./src/**/*.{js,ts,jsx,tsx,mdx}', './app/**/*.{js,ts,jsx,tsx,mdx}'], {
  theme: {
    extend: {},
  },
});

// PandaCSS coexistence (PR0): PandaCSS owns the global reset via globals.css `@layer reset`.
// Disable Tailwind's preflight so it does not double-reset / clobber panda-styled components.
// Re-enable when PandaCSS is removed (PR final).
config.corePlugins = {
  ...(config.corePlugins as Record<string, boolean> | undefined),
  preflight: false,
};

export default config;
