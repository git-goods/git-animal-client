import type { Config } from 'tailwindcss';
import { theme } from './theme';

// GitAnimals Tailwind CSS Preset
export const gitAnimalsPreset: Config = {
  content: [],
  theme: {
    colors: theme.colors,
    fontFamily: theme.fontFamily,
    zIndex: theme.zIndex,
    extend: theme.extend,
  },
  plugins: [],
};

export default gitAnimalsPreset;