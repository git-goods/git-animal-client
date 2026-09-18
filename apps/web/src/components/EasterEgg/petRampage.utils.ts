/** 클립패스 조각(파편) 폴리곤. 중심에서 뻗어나가는 삼각형 팬이라 유리 깨지듯 보인다. */
export function shardPolygons(count: number, random: () => number = Math.random): string[] {
  const points = Array.from({ length: count }, (_, i) => {
    const angle = (i / count) * Math.PI * 2 - Math.PI / 2;
    // 반지름 90%: 박스 밖까지 넘겨야 모서리가 잘리지 않는다
    const radius = 90 * (0.8 + random() * 0.6);
    return [50 + Math.cos(angle) * radius, 50 + Math.sin(angle) * radius] as const;
  });

  return points.map((point, i) => {
    const next = points[(i + 1) % count];
    return `50% 50%, ${point[0].toFixed(2)}% ${point[1].toFixed(2)}%, ${next[0].toFixed(2)}% ${next[1].toFixed(2)}%`;
  });
}

type Box = { width: number; height: number };

/** 한 입 크기인가. 화면을 절반 넘게 덮는 블록은 한 번에 페이지가 다 사라져서 재미가 없다. */
export function isBiteSized(rect: Box, viewportHeight: number): boolean {
  return rect.width > 120 && rect.height > 60 && rect.height <= viewportHeight * 0.5;
}
