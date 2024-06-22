import { SemanticTokens } from '@pandacss/dev';
import { BLACK, WHITE, BRAND } from '@gitanimals/ui-token';

export const semanticTokens: SemanticTokens = {
  colors: {
    brand: {
      DEFAULT: { value: BRAND.sky },
      ...Object.keys(BRAND).reduce<Record<string, { value: string }>>((acc, key) => {
        acc[key] = { value: BRAND[key as keyof typeof BRAND] };
        return acc;
      }, {}),
    },
    black: {
      DEFAULT: { value: BLACK.black },
      ...Object.keys(BLACK).reduce<Record<string, { value: string }>>((acc, key) => {
        acc[key] = { value: BLACK[key as keyof typeof BLACK] };
        return acc;
      }, {}),
    },
    white: {
      DEFAULT: { value: WHITE.white },
      ...Object.keys(WHITE).reduce<Record<string, { value: string }>>((acc, key) => {
        acc[key] = { value: WHITE[key as keyof typeof WHITE] };
        return acc;
      }, {}),
    },
  },
};
