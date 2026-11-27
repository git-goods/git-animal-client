// 이미 고른 펫이면 빼고, 아니면 max 를 넘지 않을 때만 더한다
export function toggleSelection(current: readonly string[], id: string, max: number): string[] {
  if (current.includes(id)) return current.filter((v) => v !== id);
  return current.length >= max ? [...current] : [...current, id];
}
