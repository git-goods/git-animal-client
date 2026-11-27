import { Text, type TextProps } from 'react-native';
import { glyphStyle, type GlyphKey } from './glyph';

type PixelTextProps = TextProps & {
  variant?: GlyphKey;
  bold?: boolean;
  className?: string;
};

export function PixelText({
  variant = 'glyph16',
  bold = false,
  style,
  ...rest
}: PixelTextProps) {
  const base = glyphStyle(variant, bold ? 'bold' : 'regular');

  return (
    <Text
      {...rest}
      style={[base, style]}
    />
  );
}
