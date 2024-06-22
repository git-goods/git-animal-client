import { Tokens } from '@pandacss/dev';
import { COLORS } from '@gitanimals/ui-token';

const colors = Object.keys(COLORS).reduce<Record<string, { value: string }>>((acc, key) => {
  // TODO: typescript util 만들어서 타입 추론되게
  acc[key] = { value: COLORS[key as keyof typeof COLORS] };
  return acc;
}, {});

export const tokens: Tokens = {
  colors,
};
