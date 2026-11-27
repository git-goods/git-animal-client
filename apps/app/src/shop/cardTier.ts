export type CardTier = 'EX' | 'S_PLUS' | 'A_PLUS' | 'B_MINUS';

// 웹 apps/web/src/constants/animalTier.ts 와 같은 경계. dropRate 는 '0.01%' 처럼 올 수도 있다
export function cardTier(dropRate: string): CardTier {
  const rate = Number(dropRate.replace('%', ''));
  if (rate <= 0) return 'EX';
  if (rate <= 0.01) return 'S_PLUS';
  if (rate <= 0.14) return 'A_PLUS';
  return 'B_MINUS';
}

// DESSERT_FOX → Dessert Fox
export const cardName = (type: string) =>
  type
    .toLowerCase()
    .split('_')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
