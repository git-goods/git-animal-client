import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Utility function for merging Tailwind CSS classes
 * Combines clsx for conditional classes and tailwind-merge for deduplication
 *
 * @example
 * cn('px-4 py-2', 'bg-blue-500', isActive && 'bg-blue-700')
 * cn('text-sm', className) // className can override defaults
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
