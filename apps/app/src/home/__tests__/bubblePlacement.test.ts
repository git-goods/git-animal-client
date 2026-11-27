import { pickGreeting } from '../bubblePlacement';

describe('pickGreeting', () => {
  it('목록에서 하나를 고른다', () => {
    expect(pickGreeting(['a', 'b', 'c'], () => 0.99)).toBe('c');
    expect(pickGreeting([], () => 0)).toBe('');
  });
});
