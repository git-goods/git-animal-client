import type { TextStyle } from 'react-native';
import { FONT } from './pixel/glyph';

// Figma place-su 글자: Product Sans, 자간 -0.3. lineHeight 는 배수
export const sans = (fontSize: number, lineHeight: number, bold = false): TextStyle => ({
  fontFamily: bold ? FONT.sansBold : FONT.sans,
  fontSize,
  lineHeight: fontSize * lineHeight,
  letterSpacing: -0.3,
});
