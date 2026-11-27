import { describe, expect, it } from 'vitest';

import { toPetName } from './animals';

describe('toPetName', () => {
  it('타입을 단어별 첫 글자 대문자로 바꾼다', () => {
    expect(toPetName('HAMSTER_SNOW')).toBe('Hamster Snow');
    expect(toPetName('CAT')).toBe('Cat');
  });
});
