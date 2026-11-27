import { describe, expect, test } from 'vitest';

import { asciiBox, getTreeLayout } from './layout';

describe('getTreeLayout', () => {
  test('1512×789: 트리 오른쪽 여백이 로고 왼쪽 여백과 같다', () => {
    const l = getTreeLayout(1512, 789);
    expect(l.centerX).toBeCloseTo(1512 - 144 - 789 * 0.28); // (1512-1320)/2+48 = 144
    expect(l.fill).toBe(0.72);
    expect(l.fs).toBe(12);
  });

  test('1280: 좌측 여백 최소 48', () => {
    const l = getTreeLayout(1280, 800);
    expect(l.centerX).toBeCloseTo(1280 - 48 - 800 * 0.28);
    expect(l.fill).toBe(0.72);
    expect(getTreeLayout(1024, 768).fill).toBe(0.64);
  });

  test('768 이하는 가운데 정렬 모바일 값', () => {
    expect(getTreeLayout(768, 1024)).toEqual({ centerX: 384, fill: 0.98, treeDrop: -0.01, fs: 9, bloomScale: 0.56 });
    expect(getTreeLayout(390, 844).centerX).toBe(195);
  });
});

describe('asciiBox', () => {
  test('영문 라벨', () => {
    expect(asciiBox('Go To Mypage ->')).toBe(
      '+---------------------+\n|   Go To Mypage ->   |\n+---------------------+',
    );
  });

  test('한글은 2칸으로 세어 테두리가 맞는다', () => {
    const [top, mid] = asciiBox('마이페이지 ->').split('\n');
    const width = (s: string) => [...s].reduce((n, c) => n + (c.charCodeAt(0) > 0x2e80 ? 2 : 1), 0);
    expect(width(mid)).toBe(top.length);
  });
});
