import type { AnimalTierType } from '@/constants/animalTier';
import { ANIMAL_TIER_INFO, AnimalTier } from '@/constants/animalTier';

const PERSONA_GRADE_PRIORITY: Record<string, number> = {
  COLLABORATOR: 0,
  DEFAULT: 1,
  EVOLUTION: 2,
};

export const getPersonaGradePriority = (grade: string): number => PERSONA_GRADE_PRIORITY[grade] ?? 1;

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

// DESSERT_FOX → Dessert Fox
export const toPetName = (type: string) =>
  type
    .toLowerCase()
    .split('_')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
