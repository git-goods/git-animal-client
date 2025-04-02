import type { Position } from './game-types';

export function getRandomPosition(maxWidth: number, maxHeight: number): Position {
  return {
    x: Math.random() * maxWidth,
    y: Math.random() * maxHeight,
  };
}
