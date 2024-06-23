import { defineTokens } from '@pandacss/dev';
import { COLORS } from '@gitanimals/ui-token';
import { objectKeys } from '@gitanimals/util-typescript';

const colors = objectKeys(COLORS).reduce<Record<string, { value: string }>>((acc, key) => {
  acc[key] = { value: COLORS[key] };
  return acc;
}, {});

export const tokens = defineTokens({
  colors,
});
