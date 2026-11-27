import { bubbleSide, pickGreeting } from '../bubblePlacement';

describe('bubbleSide', () => {
  it('왼쪽 1/3 은 오른쪽, 가운데는 위, 오른쪽 1/3 은 왼쪽', () => {
    expect(bubbleSide(50, 390)).toBe('right');
    expect(bubbleSide(195, 390)).toBe('top');
    expect(bubbleSide(340, 390)).toBe('left');
  });
});

describe('pickGreeting', () => {
  it('목록에서 하나를 고른다', () => {
    expect(pickGreeting(['a', 'b', 'c'], () => 0.99)).toBe('c');
    expect(pickGreeting([], () => 0)).toBe('');
  });
});
