export enum AnimalTier {
  EX = 'EX',
  S_PLUS = 'S_PLUS',
  A_PLUS = 'A_PLUS',
  B_MINUS = 'B_MINUS',
}

export const ANIMAL_TIER_INFO: Record<AnimalTier, { min: number; max: number; label: string }> = {
  EX: {
    min: 0,
    max: 0,
    label: 'EX',
  },
  S_PLUS: {
    min: 0,
    max: 0.01,
    label: 'S+',
  },
  A_PLUS: {
    min: 0.02,
    max: 0.14,
    label: 'A+',
  },
  B_MINUS: {
    min: 0.15,
    max: 100,
    label: 'B-',
  },
};

export const ANIMAL_CARD_IMAGE_BASE_URL = '/animal-card';
