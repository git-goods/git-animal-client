import { cardName, cardTier } from '../cardTier';

test('dropRate 로 웹과 같은 등급을 고른다', () => {
  expect(cardTier('0')).toBe('EX');
  expect(cardTier('0.01%')).toBe('S_PLUS');
  expect(cardTier('0.14')).toBe('A_PLUS');
  expect(cardTier('10%')).toBe('B_MINUS');
});

test('펫 타입을 카드 이름으로 바꾼다', () => {
  expect(cardName('DESSERT_FOX')).toBe('Dessert Fox');
});
