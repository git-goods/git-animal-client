import { integerScale } from '../scale';

describe('integerScale', () => {
  it('상자에 들어가는 가장 큰 정수배를 고른다', () => {
    expect(integerScale({ w: 40, h: 40 }, { w: 130, h: 200 })).toBe(3);
    expect(integerScale({ w: 16, h: 32 }, { w: 100, h: 100 })).toBe(3);
  });

  it('상자보다 커도 최소 1배', () => {
    expect(integerScale({ w: 40, h: 40 }, { w: 30, h: 30 })).toBe(1);
  });
});
