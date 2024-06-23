import { defineSemanticTokens } from '@pandacss/dev';
import { BLACK, WHITE, BRAND } from '@gitanimals/ui-token';
import { objectKeys } from '@gitanimals/util-typescript';

export const semanticTokens = defineSemanticTokens({
  colors: {
    brand: {
      DEFAULT: { value: BRAND.sky },
      ...objectKeys(BRAND).reduce<Record<string, { value: string }>>((acc, key) => {
        acc[key] = { value: BRAND[key] };
        return acc;
      }, {}),
    },
    black: {
      DEFAULT: { value: BLACK.black },
      ...objectKeys(BLACK).reduce<Record<string, { value: string }>>((acc, key) => {
        acc[key] = { value: BLACK[key] };
        return acc;
      }, {}),
    },
    white: {
      DEFAULT: { value: WHITE.white },
      ...objectKeys(WHITE).reduce<Record<string, { value: string }>>((acc, key) => {
        acc[key] = { value: WHITE[key] };
        return acc;
      }, {}),
    },
  },
});
