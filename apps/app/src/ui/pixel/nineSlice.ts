export type Rect = { x: number; y: number; w: number; h: number };
type Size = { w: number; h: number };

// source 를 생략하면 slice 3칸짜리(가운데 1칸) 정사각형 원본으로 본다
export function nineSlice(
  size: Size,
  slice: number,
  scale: number,
  source: Size = { w: slice * 3, h: slice * 3 },
): { src: Rect; dst: Rect }[] {
  const edge = slice * scale;
  const srcX = [0, slice, source.w - slice];
  const srcW = [slice, source.w - slice * 2, slice];
  const srcY = [0, slice, source.h - slice];
  const srcH = [slice, source.h - slice * 2, slice];
  const dstX = [0, edge, size.w - edge];
  const dstW = [edge, Math.max(size.w - edge * 2, 0), edge];
  const dstY = [0, edge, size.h - edge];
  const dstH = [edge, Math.max(size.h - edge * 2, 0), edge];

  return [0, 1, 2].flatMap((row) =>
    [0, 1, 2].map((col) => ({
      src: { x: srcX[col], y: srcY[row], w: srcW[col], h: srcH[row] },
      dst: { x: dstX[col], y: dstY[row], w: dstW[col], h: dstH[row] },
    })),
  );
}
