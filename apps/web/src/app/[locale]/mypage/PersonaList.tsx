'use client';

import { createContext, useContext, useEffect, useMemo, useRef } from 'react';
import { useTranslations } from 'next-intl';
import type { Persona } from '@gitanimals/api';
import { userQueries } from '@gitanimals/react-query';
import { cn, Skeleton } from '@gitanimals/ui-tailwind';
import { wrap } from '@suspensive/react';
import { useSuspenseQuery } from '@tanstack/react-query';

import { MemoizedBannerPersonaItem } from '@/entities/persona/ui/PersonaItem';
import { PersonaListToolbar } from '@/entities/persona/ui/PersonaListToolbar';
import type { PersonaFilterState } from '@/entities/persona/model/usePersonaListFilter';
import { usePersonaListFilter } from '@/entities/persona/model/usePersonaListFilter';
import { useClientUser } from '@/shared/utils/clientAuth';

// ─── Context ────────────────────────────────────────────────────────

interface SelectPersonaListContextValue {
  filterState: PersonaFilterState;
  updateFilter: (partial: Partial<PersonaFilterState>) => void;
  resetFilter: () => void;
  counts: { filtered: number; total: number };
  isFiltering: boolean;
  filteredList: Persona[];
  selectedIds: Set<string>;
  onSelectPersona: (persona: Persona) => void;
  loadingPersona?: string[];
  isSpecialEffect?: boolean;
}

const SelectPersonaListContext = createContext<SelectPersonaListContextValue | null>(null);

function useSelectPersonaListContext() {
  const ctx = useContext(SelectPersonaListContext);
  if (!ctx) throw new Error('SelectPersonaList compound components must be used within <SelectPersonaList>');
  return ctx;
}

// ─── Styles ─────────────────────────────────────────────────────────

const listStyle = cn(
  'gap-1 grid grid-cols-[repeat(auto-fill,minmax(64px,auto))]',
  'max-mobile:grid-cols-[repeat(auto-fill,minmax(52px,auto))]',
);

const emptyStyle = cn(
  'font-product text-glyph-14 text-white-50 text-center py-6',
);

// ─── Sub-components ─────────────────────────────────────────────────

interface ToolbarProps {
  showSearch?: boolean;
  showVisibilityFilter?: boolean;
  showEvolvableFilter?: boolean;
}

function Toolbar({ showSearch, showVisibilityFilter, showEvolvableFilter }: ToolbarProps) {
  const { filterState, updateFilter, resetFilter, counts, isFiltering } = useSelectPersonaListContext();

  return (
    <PersonaListToolbar
      filterState={filterState}
      onFilterChange={updateFilter}
      onReset={resetFilter}
      counts={counts}
      isFiltering={isFiltering}
      showSearch={showSearch}
      showVisibilityFilter={showVisibilityFilter}
      showEvolvableFilter={showEvolvableFilter}
    />
  );
}

function Grid() {
  const t = useTranslations('Mypage.Filter');
  const { filteredList, selectedIds, onSelectPersona, loadingPersona, isSpecialEffect } = useSelectPersonaListContext();

  if (filteredList.length === 0) {
    return <p className={emptyStyle}>{t('no-results')}</p>;
  }

  return (
    <div className={listStyle}>
      {filteredList.map((persona) => (
        <MemoizedBannerPersonaItem
          key={persona.id}
          persona={persona}
          isSelected={selectedIds.has(persona.id)}
          onClick={() => onSelectPersona(persona)}
          loading={loadingPersona?.includes(persona.id) ?? false}
          isSpecialEffect={isSpecialEffect}
        />
      ))}
    </div>
  );
}

// ─── Root ───────────────────────────────────────────────────────────

interface Props {
  selectPersona?: string[];
  onSelectPersona: (persona: Persona) => void;
  initSelectPersonas?: (list: Persona[]) => void;
  loadingPersona?: string[];
  isSpecialEffect?: boolean;
  children?: React.ReactNode;
}

const Root = wrap
  .ErrorBoundary({
    fallback: <div>error</div>,
  })
  .Suspense({
    fallback: (
      <div className={cn(listStyle, 'min-h-16')}>
        {Array.from({ length: 6 }).map((_, index) => (
          <Skeleton key={index} className="w-16 h-16 rounded-lg" />
        ))}
      </div>
    ),
  })
  .on(function SelectPersonaList({
    selectPersona,
    isSpecialEffect,
    onSelectPersona,
    initSelectPersonas,
    loadingPersona,
    children,
  }: Props) {
    const { name } = useClientUser();
    const { data } = useSuspenseQuery(userQueries.allPersonasOptions(name));
    const hasInitialized = useRef(false);

    const { filteredList, filterState, updateFilter, resetFilter, isFiltering, counts } = usePersonaListFilter(
      data.personas,
    );

    useEffect(() => {
      if (initSelectPersonas && !hasInitialized.current && data.personas.length > 0) {
        hasInitialized.current = true;
        initSelectPersonas(data.personas);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const selectedIds = useMemo(
      () => new Set(selectPersona ?? data.personas.filter((p) => p.visible).map((p) => p.id)),
      [selectPersona, data],
    );

    const contextValue: SelectPersonaListContextValue = useMemo(
      () => ({
        filterState,
        updateFilter,
        resetFilter,
        counts,
        isFiltering,
        filteredList,
        selectedIds,
        onSelectPersona,
        loadingPersona,
        isSpecialEffect,
      }),
      [
        filterState,
        updateFilter,
        resetFilter,
        counts,
        isFiltering,
        filteredList,
        selectedIds,
        onSelectPersona,
        loadingPersona,
        isSpecialEffect,
      ],
    );

    return (
      <SelectPersonaListContext.Provider value={contextValue}>{children ?? <Grid />}</SelectPersonaListContext.Provider>
    );
  });

// ─── Export ─────────────────────────────────────────────────────────

export const SelectPersonaList = Object.assign(Root, {
  Toolbar,
  Grid,
});
