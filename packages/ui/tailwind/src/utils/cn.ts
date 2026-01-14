import { type ClassValue, clsx } from 'clsx';
import { extendTailwindMerge } from 'tailwind-merge';

const customTwMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      'font-size': [
        {
          'text-glyph': ['12', '14', '15', '16', '18', '20', '22', '24', '28', '32', '36', '40', '48', '82'],
        },
      ],
    },
  },
});

/**
 * Utility function for merging Tailwind CSS classes
 * Combines clsx for conditional classes and tailwind-merge for deduplication
 *
 * @example
 * cn('px-4 py-2', 'bg-blue-500', isActive && 'bg-blue-700')
 * cn('text-sm', className) // className can override defaults
 */
export function cn(...inputs: ClassValue[]) {
  return customTwMerge(clsx(inputs));
}
