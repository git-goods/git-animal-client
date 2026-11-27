import { integerScale } from '../scale';

describe('integerScale', () => {
  it('상자에 들어가는 가장 큰 정수배를 고른다', () => {
    expect(integerScale({ w: 40, h: 40 }, { w: 130, h: 200 })).toBe(3);
    expect(integerScale({ w: 16, h: 32 }, { w: 100, h: 100 })).toBe(3);
  });

  it('상자보다 크면 정수분의 1로 줄인다', () => {
    expect(integerScale({ w: 140, h: 140 }, { w: 70, h: 70 })).toBe(1 / 2);
    expect(integerScale({ w: 140, h: 140 }, { w: 60, h: 60 })).toBe(1 / 3);
  });
});
