import type { Config } from 'tailwindcss';
import { createGitAnimalsConfig } from '@gitanimals/ui-tailwind/config';

const config: Config = createGitAnimalsConfig(
  [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  {
    theme: {
      extend: {
        // Add any app-specific theme extensions here
      },
    },
  }
);

export default config;
