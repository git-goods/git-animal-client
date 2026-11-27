export type BubbleSide = 'right' | 'top' | 'left';

// 피그마 규칙: 펫 중심이 화면 왼쪽 1/3 이면 오른쪽, 가운데면 위, 오른쪽 1/3 이면 왼쪽에 말풍선
export function bubbleSide(centerX: number, stageWidth: number): BubbleSide {
  if (centerX < stageWidth / 3) return 'right';
  if (centerX > (stageWidth * 2) / 3) return 'left';
  return 'top';
}

export function pickGreeting(greetings: readonly string[], random = Math.random): string {
  return greetings[Math.floor(random() * greetings.length)] ?? '';
}
