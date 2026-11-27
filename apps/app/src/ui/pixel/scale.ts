type Size = { w: number; h: number };

export function integerScale(src: Size, box: Size): number {
  return Math.max(1, Math.floor(Math.min(box.w / src.w, box.h / src.h)));
}
