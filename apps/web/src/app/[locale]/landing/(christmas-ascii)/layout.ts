export const MOBILE_MAX = 768;

const CONTENT_WIDTH = 1320;
const MIN_SIDE = 48;
const TREE_HALF_WIDTH_RATIO = 0.28;

export interface TreeLayout {
  centerX: number;
  fill: number;
  treeDrop: number;
  fs: number;
  bloomScale: number;
}

export function getTreeLayout(w: number, h: number): TreeLayout {
  if (w <= MOBILE_MAX) {
    // 폰(세로/가로 ≥ 2) 기준 값. 덜 길쭉한 태블릿은 로고·버튼 사이에 들어가도록 줄인다
    return { centerX: w / 2, fill: 0.98 * Math.min(1, h / w / 2), treeDrop: -0.01, fs: 9, bloomScale: 0.56 };
  }
  const side = Math.max(MIN_SIDE, (w - CONTENT_WIDTH) / 2 + MIN_SIDE);
  // 트리 오른쪽 끝을 로고 왼쪽 여백과 같은 거리에 둔다
  return {
    centerX: w - side - h * TREE_HALF_WIDTH_RATIO,
    fill: w < 1250 ? 0.64 : 0.72,
    treeDrop: 0,
    fs: 12,
    bloomScale: 1,
  };
}

// 모노 폰트에서 한중일 문자는 두 칸을 차지한다
export const cellWidth = (s: string) => [...s].reduce((n, c) => n + (c.charCodeAt(0) > 0x2e80 ? 2 : 1), 0);

export function asciiBox(label: string): string {
  const pad = '   ';
  const edge = `+${'-'.repeat(cellWidth(label) + pad.length * 2)}+`;
  return `${edge}\n|${pad}${label}${pad}|\n${edge}`;
}
