export type CardTierType = 'EX' | 'S_PLUS' | 'A_PLUS' | 'B_MINUS';

export const CARD_INFO: Record<CardTierType, { bg: string; thumbnail: string }> = {
  EX: {
    bg: 'card-bg-EX.webp',
    thumbnail: 'card-thumbnail-EX.webp',
  },
  S_PLUS: {
    bg: 'card-bg-S_PLUS.webp',
    thumbnail: 'card-thumbnail-S_PLUS.webp',
  },
  A_PLUS: {
    bg: 'card-bg-A_PLUS.webp',
    thumbnail: 'card-thumbnail-A_PLUS.webp',
  },
  B_MINUS: {
    bg: 'card-bg-B_MINUS.webp',
    thumbnail: 'card-thumbnail-B_MINUS.webp',
  },
};

export const ANIMAL_CARD_IMAGE_BASE_URL = '/assets/animal-card/';
