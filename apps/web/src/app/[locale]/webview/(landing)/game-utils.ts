import { GAME_CONSTANTS } from './game-constants';
import type { Position } from './game-types';

/**
 * 색상을 밝게 만드는 함수
 * @param color 원본 색상 (헥스 코드)
 * @param percent 밝기 조절 퍼센트 (양수: 밝게, 음수: 어둡게)
 * @returns 조절된 색상 (헥스 코드)
 */
export const lightenColor = (color: string, percent: number): string => {
  const num = Number.parseInt(color.replace('#', ''), 16);
  const amt = Math.round(2.55 * percent);
  const R = (num >> 16) + amt;
  const G = ((num >> 8) & 0x00ff) + amt;
  const B = (num & 0x0000ff) + amt;
  return `#${(0x1000000 + (R < 255 ? (R < 0 ? 0 : R) : 255) * 0x10000 + (G < 255 ? (G < 0 ? 0 : G) : 255) * 0x100 + (B < 255 ? (B < 0 ? 0 : B) : 255)).toString(16).slice(1)}`;
};

/**
 * 색상을 어둡게 만드는 함수
 * @param color 원본 색상 (헥스 코드)
 * @param percent 어둡게 만들 퍼센트
 * @returns 어두워진 색상 (헥스 코드)
 */
export const darkenColor = (color: string, percent: number): string => {
  return lightenColor(color, -percent);
};

/**
 * 화면 내 랜덤 위치 생성 함수
 * @param width 캔버스 너비
 * @param height 캔버스 높이
 * @returns 랜덤 위치 객체
 */
export const getRandomPosition = (width: number, height: number): Position => {
  // 화면 가장자리에서 약간 떨어진 위치 생성
  const margin = GAME_CONSTANTS.MOVEMENT.MARGIN;
  return {
    x: Math.random() * (width - margin * 2) + margin,
    y: Math.random() * (height - margin * 2) + margin,
  };
};

/**
 * 두 점 사이의 거리 계산 함수
 * @param p1 첫 번째 위치
 * @param p2 두 번째 위치
 * @returns 두 점 사이의 거리
 */
export const getDistance = (p1: Position, p2: Position): number => {
  const dx = p2.x - p1.x;
  const dy = p2.y - p1.y;
  return Math.sqrt(dx * dx + dy * dy);
};

/**
 * 랜덤 배열 요소 선택 함수
 * @param array 선택할 배열
 * @returns 배열에서 무작위로 선택된 요소
 */
export function getRandomArrayElement<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}
