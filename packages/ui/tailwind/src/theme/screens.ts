/**
 * Media Breakpoints (numeric values for JS usage)
 */
export const mediaBreakpoints = {
  mobile: 768,
  tablet: 1024,
  pc: 1440,
};

/**
 * Media query strings for JS usage
 */
export const media = {
  mobile: `@media (max-width: ${mediaBreakpoints.mobile}px)`,
  tablet: `@media (max-width: ${mediaBreakpoints.tablet}px)`,
  pc: `@media (max-width: ${mediaBreakpoints.pc}px)`,
  desktop: `@media (min-width: ${mediaBreakpoints.mobile}px)`,
};

/**
 * Responsive Breakpoints
 * Mapped from PandaCSS media conditions
 *
 * Usage in Tailwind:
 * - max-mobile:p-4 → applies when max-width: 768px
 * - desktop:p-8 → applies when min-width: 769px
 * - max-tablet:hidden → applies when max-width: 1024px
 */
export const screens = {
  // Min-width breakpoints (default Tailwind behavior)
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1440px',

  // Max-width breakpoints — DESCENDING order so cascade works correctly
  // (larger max-width first, smaller last → smaller breakpoints override larger ones)
  'max-pc': { max: '1440px' },
  'max-1400': { max: '1400px' },
  'max-1200': { max: '1200px' },
  'max-tablet': { max: '1024px' },
  'max-950': { max: '950px' },
  'max-900': { max: '900px' },
  'max-mobile': { max: '768px' },
  'max-600': { max: '600px' },
  'max-400': { max: '400px' },

  // Min-width named breakpoints
  desktop: { min: '769px' },
  tablet: { min: '769px', max: '1024px' },
  pc: { min: '1025px', max: '1440px' },
};
