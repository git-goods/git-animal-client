import type { Config } from 'tailwindcss';
import { colors } from './theme/colors';
import { fontSize, fontFamily } from './theme/typography';
import { keyframes, animation } from './theme/keyframes';
import { screens } from './theme/screens';
import { zIndex } from './theme/zIndex';

/**
 * GitAnimals Tailwind Preset
 * Use this preset in your tailwind.config.ts:
 *
 * @example
 * import { gitAnimalsPreset } from '@gitanimals/ui-tailwind/preset';
 *
 * export default {
 *   presets: [gitAnimalsPreset],
 *   content: ['./src/**\/*.{js,ts,jsx,tsx}'],
 * }
 */
export const gitAnimalsPreset: Partial<Config> = {
  theme: {
    colors,
    fontSize,
    fontFamily,
    screens,
    zIndex,
    extend: {
      keyframes,
      animation,
    },
  },
  plugins: [],
};

export default gitAnimalsPreset;
