export enum AnimalTier {
  EX = 'EX',
  S_PLUS = 'S_PLUS',
  A_PLUS = 'A_PLUS',
  B_MINUS = 'B_MINUS',
}

export const ANIMAL_TIER_INFO: Record<AnimalTier, { min: number; max: number }> = {
  EX: {
    min: 0,
    max: 0,
  },
  S_PLUS: {
    min: 0,
    max: 0.01,
  },
  A_PLUS: {
    min: 0.02,
    max: 0.14,
  },
  B_MINUS: {
    min: 0.15,
    max: 100,
  },
};
