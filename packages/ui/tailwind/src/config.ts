import type { Config } from 'tailwindcss';
import { theme } from './theme';

/**
 * Complete GitAnimals Tailwind CSS v3 configuration
 * Can be used as a base config or extended by applications
 */
export const gitAnimalsConfig: Config = {
  content: [
    // Default content paths - applications should extend this
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: theme.colors,
      fontFamily: theme.fontFamily,
      zIndex: theme.zIndex,
      animation: theme.extend.animation,
      keyframes: theme.extend.keyframes,
    },
  },
  plugins: [],
};

/**
 * Factory function to create Tailwind v3 config with custom content paths
 * @param contentPaths - Array of content paths specific to the application
 * @param extend - Additional theme extensions or config overrides
 * @returns Complete Tailwind v3 configuration
 */
export function createGitAnimalsConfig(
  contentPaths: string[] = [],
  extend: Partial<Config> = {}
): Config {
  return {
    ...gitAnimalsConfig,
    content: [
      ...(Array.isArray(gitAnimalsConfig.content) ? gitAnimalsConfig.content : []),
      ...contentPaths,
      // Always include ui-tailwind components
      '../../packages/ui/tailwind/src/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
      extend: {
        ...gitAnimalsConfig.theme!.extend,
        ...extend.theme?.extend,
      },
    },
    plugins: [
      ...(gitAnimalsConfig.plugins || []),
      ...(extend.plugins || []),
    ],
  };
}

export default gitAnimalsConfig;