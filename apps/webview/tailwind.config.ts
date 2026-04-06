import { createGitAnimalsConfig } from '@gitanimals/ui-tailwind/config';
import type { Config } from 'tailwindcss';

const config: Config = createGitAnimalsConfig(['./src/**/*.{js,ts,jsx,tsx}'], {
  theme: {
    extend: {},
  },
});

export default config;
