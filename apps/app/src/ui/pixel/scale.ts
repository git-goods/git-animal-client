type Size = { w: number; h: number };

// 상자에 딱 맞는 배율. 정수배가 아니라 픽셀 크기가 조금 고르지 않을 수 있다
export function fitScale(src: Size, box: Size): number {
  return Math.min(box.w / src.w, box.h / src.h);
}

// 상자에 들어가면 가장 큰 정수배, 넘치면 1/2·1/3 처럼 정수분의 1로 줄여 픽셀 격자를 유지한다
export function integerScale(src: Size, box: Size): number {
  const fit = fitScale(src, box);
  return fit >= 1 ? Math.floor(fit) : 1 / Math.ceil(1 / fit);
}
