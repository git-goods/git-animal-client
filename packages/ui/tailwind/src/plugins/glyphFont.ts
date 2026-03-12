import plugin from 'tailwindcss/plugin';

export const glyphFontPlugin = plugin(({ addUtilities, theme }) => {
  const fontSizes = theme('fontSize') as Record<string, unknown> | undefined;
  if (!fontSizes) return;

  const utilities: Record<string, { fontFamily: string }> = {};

  for (const key of Object.keys(fontSizes)) {
    if (key.startsWith('glyph-')) {
      utilities[`.text-${key}`] = {
        fontFamily: "'Product Sans', system-ui, sans-serif",
      };
    }
  }

  addUtilities(utilities);
});
