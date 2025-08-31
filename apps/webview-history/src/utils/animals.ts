import type { AnimalTierType } from '@/components/AnimalCard/AnimalCard.constant';
import { ANIMAL_TIER_INFO, AnimalTier } from '@/components/AnimalCard/AnimalCard.constant';

export const getAnimalTierInfo = (dropRateNumber: number): AnimalTierType => {
  if (dropRateNumber <= ANIMAL_TIER_INFO.EX.max) {
    return AnimalTier.EX;
  }
  if (dropRateNumber <= ANIMAL_TIER_INFO.S_PLUS.max) {
    return AnimalTier.S_PLUS;
  }
  if (dropRateNumber <= ANIMAL_TIER_INFO.A_PLUS.max) {
    return AnimalTier.A_PLUS;
  }
  return AnimalTier.B_MINUS;
};

export const ANIMAL_TIER_TEXT_MAP: Record<AnimalTierType, string> = {
  [AnimalTier.EX]: 'EX',
  [AnimalTier.S_PLUS]: 'S+',
  [AnimalTier.A_PLUS]: 'A+',
  [AnimalTier.B_MINUS]: 'B-',
};
