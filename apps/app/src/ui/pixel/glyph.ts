import type { TextStyle } from 'react-native';
import { GLYPH } from '@gitanimals/ui-token';

export type GlyphKey = keyof typeof GLYPH;
type Weight = 'regular' | 'bold';

export const FONT = {
  body: 'Galmuri11',
  bodyBold: 'Galmuri11-Bold',
  title: 'DNFBitBitv2',
  sans: 'ProductSans-Regular',
  sansBold: 'ProductSans-Bold',
} as const;

type Token = { fontSize: string; lineHeight: string; letterSpacing: string };

export function glyphStyle(key: GlyphKey, weight: Weight): TextStyle {
  const variants: Partial<Record<Weight, Token>> = GLYPH[key];
  const resolved: Weight =
    variants[weight] ? weight : weight === 'bold' ? 'regular' : 'bold';
  const token = variants[resolved] as Token;
  const fontSize = parseFloat(token.fontSize);

  return {
    fontFamily: resolved === 'bold' ? FONT.bodyBold : FONT.body,
    fontSize,
    lineHeight: (fontSize * parseFloat(token.lineHeight)) / 100,
    letterSpacing: parseFloat(token.letterSpacing),
  };
}
