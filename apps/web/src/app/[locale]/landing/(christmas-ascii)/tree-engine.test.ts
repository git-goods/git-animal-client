import { describe, expect, test } from 'vitest';

import { createTreeEngine } from './tree-engine';

describe('tree-engine', () => {
  const E = createTreeEngine();

  test('gitanimals.org 는 버전 2(25×25) QR 로 인코딩된다', () => {
    const q = E.getQR('https://www.gitanimals.org');
    expect(q.ver).toBe(2);
    expect(q.N).toBe(25);
  });

  test('세 모서리 finder 패턴 외곽이 검정이다', () => {
    const { M, N } = E.getQR('https://www.gitanimals.org');
    expect(M[0].slice(0, 7)).toEqual([1, 1, 1, 1, 1, 1, 1]);
    expect(M[0].slice(N - 7)).toEqual([1, 1, 1, 1, 1, 1, 1]);
    expect(M[N - 1].slice(0, 7)).toEqual([1, 1, 1, 1, 1, 1, 1]);
  });
});
