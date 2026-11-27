import type { Persona } from '@gitanimals/api';

export const personaImageUrl = (type: string) => `https://static.gitanimals.org/personas/${type}`;

export function pickHomePets(personas: Persona[], max = 5): Persona[] {
  return personas
    .filter((p) => p.visible)
    .sort((a, b) => Number(b.level) - Number(a.level))
    .slice(0, max);
}
