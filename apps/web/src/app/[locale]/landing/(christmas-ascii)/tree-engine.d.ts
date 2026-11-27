export interface QRMatrix {
  N: number;
  ver: number;
  M: (0 | 1)[][];
}

export interface DrawOptions {
  /** 0 = 위에서 내려다본 QR, 1 = 옆에서 본 트리 */
  cam: number;
  reveal: number;
  grow: number;
  drop: number;
  treeMix: number;
  /** 초 */
  time: number;
  dpr: number;
  /** 글자 크기(px) */
  fs: number;
  bloomScale?: number;
  fill: number;
  treeDrop?: number;
  fall: boolean;
  baubles: boolean;
  /** 트리 중심 x(px). 없으면 가운데 */
  centerX?: number;
}

export interface TreeEngine {
  getQR(text: string): QRMatrix;
  draw(ctx: CanvasRenderingContext2D, w: number, h: number, text: string, key: string, opts: DrawOptions): void;
  ease(t: number): number;
}

export function createTreeEngine(): TreeEngine;
