import { nineSlice, type Rect } from '../nineSlice';

const pieces = nineSlice({ w: 300, h: 120 }, 8, 3);

const overlap = (a: Rect, b: Rect) =>
  a.x < b.x + b.w && b.x < a.x + a.w && a.y < b.y + b.h && b.y < a.y + a.h;

describe('nineSlice', () => {
  it('9조각을 만든다', () => {
    expect(pieces).toHaveLength(9);
  });

  it('왼쪽 위 모서리는 slice*scale 정사각형이다', () => {
    expect(pieces[0].dst).toEqual({ x: 0, y: 0, w: 24, h: 24 });
    expect(pieces[0].src).toEqual({ x: 0, y: 0, w: 8, h: 8 });
  });

  it('가운데는 모서리를 뺀 나머지를 채운다', () => {
    expect(pieces[4].dst).toEqual({ x: 24, y: 24, w: 252, h: 72 });
    expect(pieces[4].src).toEqual({ x: 8, y: 8, w: 8, h: 8 });
  });

  it('모든 dst 가 겹침 없이 대상 전체를 덮는다', () => {
    const area = pieces.reduce((sum, { dst }) => sum + dst.w * dst.h, 0);
    expect(area).toBe(300 * 120);
    pieces.forEach((a, i) =>
      pieces.slice(i + 1).forEach((b) => expect(overlap(a.dst, b.dst)).toBe(false)),
    );
    pieces.forEach(({ dst }) => {
      expect(dst.x).toBeGreaterThanOrEqual(0);
      expect(dst.y).toBeGreaterThanOrEqual(0);
      expect(dst.x + dst.w).toBeLessThanOrEqual(300);
      expect(dst.y + dst.h).toBeLessThanOrEqual(120);
    });
  });

  it('원본이 24×24 가 아니면 source 로 알려 준다', () => {
    const [, , , , center, , , , br] = nineSlice({ w: 300, h: 120 }, 8, 3, { w: 48, h: 48 });
    expect(center.src).toEqual({ x: 8, y: 8, w: 32, h: 32 });
    expect(br.src).toEqual({ x: 40, y: 40, w: 8, h: 8 });
  });
});
