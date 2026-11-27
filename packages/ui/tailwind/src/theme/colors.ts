import { BRAND, COLORS, GRADIENT } from '@gitanimals/ui-token';

export const colors = {
  transparent: 'transparent',
  current: 'currentColor',

  // Figma Color 명세: -100 은 black/white 와 같아 두지 않는다.
  black: COLORS.black,
  white: COLORS.white,
  'black-alpha': {
    '5': COLORS.black_alpha_5,
    '10': COLORS.black_alpha_10,
    '25': COLORS.black_alpha_25,
    '50': COLORS.black_alpha_50,
    '75': COLORS.black_alpha_75,
    '90': COLORS.black_alpha_90,
  },
  'white-alpha': {
    '5': COLORS.white_alpha_5,
    '10': COLORS.white_alpha_10,
    '25': COLORS.white_alpha_25,
    '50': COLORS.white_alpha_50,
    '75': COLORS.white_alpha_75,
    '90': COLORS.white_alpha_90,
  },
  'green-500': COLORS.green_500,
  'warning-red': COLORS.warning_red,

  // Gray scale (mapped from GitAnimals naming). panda semanticTokens.gray.DEFAULT = gray_000.
  gray: {
    DEFAULT: COLORS.gray_000,
    '000': COLORS.gray_000,
    '050': COLORS.gray_050,
    '100': COLORS.gray_100,
    '150': COLORS.gray_150,
    '200': COLORS.gray_200,
    '300': COLORS.gray_300,
    '400': COLORS.gray_400,
    '500': COLORS.gray_500,
    '600': COLORS.gray_600,
    '700': COLORS.gray_700,
    '800': COLORS.gray_800,
    '900': COLORS.gray_900,
  },

  // Brand colors — panda semanticTokens.brand 와 1:1 (single source: ui-token BRAND).
  // DEFAULT = BRAND.sky (panda 와 동일. dev 의 green 은 오류였음 — 토큰감사 §2.1).
  brand: {
    DEFAULT: BRAND.sky,
    ...BRAND,
  },

  // Additional semantic color mappings
  green: COLORS.green,
  navy: COLORS.navy,
  coral: COLORS.coral,
  sky: COLORS.sky,
  mint: COLORS.mint,
  turquoise: COLORS.turquoise,
  peach: COLORS.peach,
  ocean: COLORS.ocean,
  fern: COLORS.fern,
};

export const backgroundImage = {
  'gradient-rainbow': GRADIENT.rainbow,
};
