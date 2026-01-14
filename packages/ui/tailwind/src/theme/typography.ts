/**
 * GLYPH Typography System
 * Mapped from @gitanimals/ui-token GLYPH definitions
 *
 * Usage in Tailwind:
 * - text-glyph-16 → 16px font size with proper line-height and letter-spacing
 * - font-product → Product Sans font family
 * - font-bold / font-normal → font weight
 */
export const fontSize: Record<string, [string, { lineHeight: string; letterSpacing: string }]> = {
  'glyph-12': ['12px', { lineHeight: '150%', letterSpacing: '-0.3px' }],
  'glyph-14': ['14px', { lineHeight: '150%', letterSpacing: '-0.3px' }],
  'glyph-15': ['15px', { lineHeight: '150%', letterSpacing: '-0.3px' }],
  'glyph-16': ['16px', { lineHeight: '150%', letterSpacing: '-0.3px' }],
  'glyph-18': ['18px', { lineHeight: '150%', letterSpacing: '-0.3px' }],
  'glyph-20': ['20px', { lineHeight: '150%', letterSpacing: '-0.3px' }],
  'glyph-22': ['22px', { lineHeight: '150%', letterSpacing: '-0.3px' }],
  'glyph-24': ['24px', { lineHeight: '120%', letterSpacing: '-0.3px' }],
  'glyph-28': ['28px', { lineHeight: '120%', letterSpacing: '-0.3px' }],
  'glyph-32': ['32px', { lineHeight: '120%', letterSpacing: '-0.3px' }],
  'glyph-36': ['36px', { lineHeight: '120%', letterSpacing: '-0.3px' }],
  'glyph-40': ['40px', { lineHeight: '120%', letterSpacing: '-0.3px' }],
  'glyph-48': ['48px', { lineHeight: '120%', letterSpacing: '-0.3px' }],
  'glyph-82': ['82px', { lineHeight: '120%', letterSpacing: '-1px' }],
};

export const fontFamily: Record<string, string[]> = {
  sans: ['system-ui', 'sans-serif'],
  mono: ['Menlo', 'monospace'],
  dnf: ['DNFBitBitv2', 'monospace'],
  product: ['Product Sans', 'system-ui', 'sans-serif'],
  dos: ['DOSGothic', 'system-ui', 'sans-serif'],
};
