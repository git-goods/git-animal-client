export type CardTier = 'EX' | 'S_PLUS' | 'A_PLUS' | 'B_MINUS';

// dropRate 는 '0.01%' 처럼 % 가 붙어 오기도 한다
export const rateNumber = (dropRate: string) => dropRate.replace('%', '');

// 웹 apps/web/src/constants/animalTier.ts 와 같은 경계
export function cardTier(dropRate: string): CardTier {
  const rate = Number(rateNumber(dropRate));
  if (rate <= 0) return 'EX';
  if (rate <= 0.01) return 'S_PLUS';
  if (rate <= 0.14) return 'A_PLUS';
  return 'B_MINUS';
}
