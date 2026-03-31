import { useDeferredValue, useMemo, useState } from 'react';
import type { Persona } from '@gitanimals/api';

import type { AnimalTierType } from '@/components/AnimalCard/AnimalCard.constant';
import { getAnimalTierInfo, getPersonaGradePriority } from '@/utils/animals';

export type SortBy = 'grade' | 'level-desc' | 'level-asc' | 'tier' | 'name';
export type GradeFilter = 'ALL' | 'COLLABORATOR' | 'DEFAULT' | 'EVOLUTION';
export type TierFilter = 'ALL' | AnimalTierType;
export type VisibilityFilter = 'ALL' | 'VISIBLE' | 'HIDDEN';

export interface PersonaFilterState {
  grade: GradeFilter;
  tier: TierFilter;
  visibility: VisibilityFilter;
  evolvableOnly: boolean;
  sortBy: SortBy;
  searchQuery: string;
}

const DEFAULT_FILTER_STATE: PersonaFilterState = {
  grade: 'ALL',
  tier: 'ALL',
  visibility: 'ALL',
  evolvableOnly: false,
  sortBy: 'grade',
  searchQuery: '',
};

const TIER_PRIORITY: Record<string, number> = {
  EX: 0,
  S_PLUS: 1,
  A_PLUS: 2,
  B_MINUS: 3,
};

function getPersonaTier(persona: Persona): AnimalTierType {
  return getAnimalTierInfo(Number(persona.dropRate));
}

function filterPersonas(personas: Persona[], state: PersonaFilterState, deferredSearch: string): Persona[] {
  return personas.filter((p) => {
    if (state.grade !== 'ALL' && p.grade !== state.grade) return false;
    if (state.tier !== 'ALL' && getPersonaTier(p) !== state.tier) return false;
    if (state.visibility === 'VISIBLE' && !p.visible) return false;
    if (state.visibility === 'HIDDEN' && p.visible) return false;
    if (state.evolvableOnly && !p.isEvolutionable) return false;
    if (deferredSearch && !p.type.toLowerCase().includes(deferredSearch.toLowerCase())) return false;
    return true;
  });
}

function sortPersonas(personas: Persona[], sortBy: SortBy): Persona[] {
  return [...personas].sort((a, b) => {
    switch (sortBy) {
      case 'grade': {
        const gradeDiff = getPersonaGradePriority(a.grade) - getPersonaGradePriority(b.grade);
        if (gradeDiff !== 0) return gradeDiff;
        if (a.visible && !b.visible) return -1;
        if (!a.visible && b.visible) return 1;
        return parseInt(b.level) - parseInt(a.level);
      }
      case 'level-desc':
        return parseInt(b.level) - parseInt(a.level);
      case 'level-asc':
        return parseInt(a.level) - parseInt(b.level);
      case 'tier': {
        const tierA = TIER_PRIORITY[getPersonaTier(a)] ?? 99;
        const tierB = TIER_PRIORITY[getPersonaTier(b)] ?? 99;
        if (tierA !== tierB) return tierA - tierB;
        return parseInt(b.level) - parseInt(a.level);
      }
      case 'name':
        return a.type.localeCompare(b.type);
      default:
        return 0;
    }
  });
}

export function usePersonaListFilter(personas: Persona[], initialState?: Partial<PersonaFilterState>) {
  const [filterState, setFilterState] = useState<PersonaFilterState>({
    ...DEFAULT_FILTER_STATE,
    ...initialState,
  });

  const deferredSearch = useDeferredValue(filterState.searchQuery);

  const filteredList = useMemo(
    () => sortPersonas(filterPersonas(personas, filterState, deferredSearch), filterState.sortBy),
    [personas, filterState, deferredSearch],
  );

  const updateFilter = (partial: Partial<PersonaFilterState>) => {
    setFilterState((prev) => ({ ...prev, ...partial }));
  };

  const resetFilter = () => {
    setFilterState({ ...DEFAULT_FILTER_STATE, ...initialState });
  };

  const isFiltering =
    filterState.grade !== 'ALL' ||
    filterState.tier !== 'ALL' ||
    filterState.visibility !== 'ALL' ||
    filterState.evolvableOnly ||
    filterState.searchQuery !== '';

  return {
    filteredList,
    filterState,
    updateFilter,
    resetFilter,
    isFiltering,
    counts: { filtered: filteredList.length, total: personas.length },
  };
}
