import type { Config } from 'tailwindcss';
import { gitAnimalsPreset } from './src/preset';

/**
 * Tailwind config for Storybook
 * This config is used by Storybook to apply the GitAnimals design tokens
 */
const config: Config = {
  presets: [gitAnimalsPreset as Config],
  content: ['./src/**/*.{js,ts,jsx,tsx}', './.storybook/**/*.{js,ts,jsx,tsx}'],
};

export default config;
