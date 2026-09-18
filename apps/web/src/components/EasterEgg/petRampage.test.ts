import { describe, expect, it } from 'vitest';

import { isBiteSized, shardPolygons } from './petRampage.utils';

describe('shardPolygons', () => {
  it('조각 수만큼 폴리곤을 만들고 마지막 조각이 첫 점으로 되돌아온다(빈틈 없음)', () => {
    const polygons = shardPolygons(4, () => 0.5);

    expect(polygons).toHaveLength(4);
    const firstPoint = polygons[0].split(', ')[1];
    const lastPointOfLast = polygons[3].split(', ')[2];
    expect(lastPointOfLast).toBe(firstPoint);
  });
});

describe('isBiteSized', () => {
  const viewport = 800;

  it('화면 절반을 넘는 블록은 거른다', () => {
    expect(isBiteSized({ width: 1000, height: 700 }, viewport)).toBe(false);
  });

  it('너무 작은 블록도 거른다', () => {
    expect(isBiteSized({ width: 40, height: 40 }, viewport)).toBe(false);
  });

  it('적당한 카드 크기는 통과한다', () => {
    expect(isBiteSized({ width: 320, height: 240 }, viewport)).toBe(true);
  });
});
