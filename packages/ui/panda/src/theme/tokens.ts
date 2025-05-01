import { defineTokens } from '@pandacss/dev';
import { COLORS } from '@gitanimals/ui-token';
import { objectKeys } from '@gitanimals/util-typescript';

const colors = objectKeys(COLORS).reduce<Record<string, { value: string }>>((acc, key) => {
  acc[key] = { value: COLORS[key] };
  return acc;
}, {});

export const tokens = defineTokens({
  colors,
  fonts: {
    body: {
      value: 'system-ui, sans-serif',
    },
    mono: {
      value: 'Menlo, monospace',
    },
    dnf: {
      value: 'DNFBitBitv2, monospace',
    },
    product: {
      value: 'Product Sans, system-ui, sans-serif',
    },
    dosgothic: {
      value: 'DOSGothic, system-ui, sans-serif',
    },
  },
  zIndex: {
    hide: { value: '-1' },
    base: { value: '0' },
    aboveDefault: { value: '1' },
    floating: { value: '2' },
    dropdown: { value: '1000' },
    sticky: { value: '1100' },
    header: { value: '1200' },
    overlay: { value: '1300' },
    drawer: { value: '1400' },
    modal: { value: '1500' },
    popover: { value: '1600' },
    toast: { value: '1700' },
    tooltip: { value: '1800' },
    loading: { value: '9999' },
  },
});
