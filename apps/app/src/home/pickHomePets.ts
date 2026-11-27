import type { Persona } from '@gitanimals/api';

export const personaImageUrl = (type: string) => `https://static.gitanimals.org/personas/${type}`;

export const HOME_PET_MAX = 10;

// 앱에서 고른 펫(selectedIds)이 있으면 그것만, 아직 고른 적이 없으면 GitHub 농장에 보이는 펫으로 시작한다
export function pickHomePets(personas: Persona[], selectedIds: readonly string[] | null = null, max = HOME_PET_MAX): Persona[] {
  const chosen = selectedIds ? personas.filter((p) => selectedIds.includes(p.id)) : personas.filter((p) => p.visible);
  return [...chosen].sort((a, b) => Number(b.level) - Number(a.level)).slice(0, max);
}
