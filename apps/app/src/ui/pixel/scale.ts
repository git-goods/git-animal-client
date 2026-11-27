type Size = { w: number; h: number };

// 상자에 들어가면 가장 큰 정수배, 넘치면 1/2·1/3 처럼 정수분의 1로 줄여 픽셀 격자를 유지한다
export function integerScale(src: Size, box: Size): number {
  const fit = Math.min(box.w / src.w, box.h / src.h);
  return fit >= 1 ? Math.floor(fit) : 1 / Math.ceil(1 / fit);
}
