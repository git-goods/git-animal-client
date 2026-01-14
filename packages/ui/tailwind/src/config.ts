import type { Config } from 'tailwindcss';
import { colors } from './theme/colors';
import { fontSize, fontFamily } from './theme/typography';
import { keyframes, animation } from './theme/keyframes';
import { screens } from './theme/screens';
import { zIndex } from './theme/zIndex';

/**
 * Base GitAnimals Tailwind Config
 * Can be extended using createGitAnimalsConfig helper
 */
export const gitAnimalsConfig = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors,
      fontSize,
      fontFamily,
      screens,
      zIndex,
      keyframes,
      animation,
    },
  },
  plugins: [],
} satisfies Config;

export interface GitAnimalsConfigOptions {
  theme?: {
    extend?: Record<string, unknown>;
  };
  plugins?: Config['plugins'];
}

/**
 * Create a GitAnimals Tailwind config with custom content paths and extensions
 *
 * @example
 * import { createGitAnimalsConfig } from '@gitanimals/ui-tailwind';
 *
 * export default createGitAnimalsConfig(
 *   ['./src/**\/*.{js,ts,jsx,tsx}'],
 *   { theme: { extend: { colors: { custom: '#123456' } } } }
 * );
 */
export function createGitAnimalsConfig(contentPaths: string[] = [], options: GitAnimalsConfigOptions = {}): Config {
  return {
    content: [
      ...contentPaths,
      // Always include ui-tailwind components
      '../../packages/ui/tailwind/src/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
      extend: {
        colors,
        fontSize,
        fontFamily,
        screens,
        zIndex,
        keyframes,
        animation,
        ...options.theme?.extend,
      },
    },
    plugins: [...(options.plugins || [])],
  };
}
