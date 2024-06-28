import { TextStyles, defineTextStyles } from '@pandacss/dev';
import { GLYPH } from '@gitanimals/ui-token';

const glyphTextStyles = Object.entries(GLYPH).reduce<TextStyles>((acc, [key, value]) => {
  const styles = Object.entries(value).reduce<TextStyles>((_acc, [key, value]) => {
    _acc[key] = { value: value };
    return _acc;
  }, {});

  acc[key] = styles;
  return acc;
}, {});

export const textStyles = defineTextStyles({
  ...glyphTextStyles,
});
