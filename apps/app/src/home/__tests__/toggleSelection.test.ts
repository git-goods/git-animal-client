import { toggleSelection } from '../toggleSelection';

describe('toggleSelection', () => {
  it('고른 펫은 빼고 안 고른 펫은 더한다', () => {
    expect(toggleSelection(['a', 'b'], 'a', 10)).toEqual(['b']);
    expect(toggleSelection(['a'], 'b', 10)).toEqual(['a', 'b']);
  });

  it('최대 개수면 더하지 않는다', () => {
    expect(toggleSelection(['a', 'b'], 'c', 2)).toEqual(['a', 'b']);
  });
});
