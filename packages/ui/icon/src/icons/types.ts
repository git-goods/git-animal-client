export type Direction = 'down' | 'left' | 'right' | 'up';

/**
 * @description 위쪽을 기준으로 rotate deg 값을 반환합니다.
 */
export const DIRECTION_DEGREE: Record<Direction, number> = {
  down: 180,
  left: 270,
  right: 90,
  up: 0,
} as const;
