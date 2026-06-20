'use client';

import { useTranslations } from 'next-intl';
import type { Persona } from '@gitanimals/api';
import { userQueries } from '@gitanimals/react-query';
import { BannerSkeletonList, cn } from '@gitanimals/ui-tailwind';
import { wrap } from '@suspensive/react';
import { useSuspenseQuery } from '@tanstack/react-query';

import { MemoizedLevelPersonaItem } from '@/components/PersonaItem';
import { PersonaListToolbar } from '@/components/PersonaListToolbar';
import { usePersonaListFilter } from '@/hooks/persona/usePersonaListFilter';
import { customScrollStyle } from '@/styles/scrollStyle';
import { useClientUser } from '@/utils/clientAuth';

const flexOverflowStyle = cn(
  'flex overflow-y-auto overflow-x-hidden w-full gap-[4px] h-full min-h-0 flex-wrap max-h-full',
  customScrollStyle,
);

interface SelectPersonaListProps {
  selectPersona: string[];
  onSelectPersona: (persona: Persona) => void;
  initSelectPersonas?: (list: Persona[]) => void;
  loadingPersona?: string[];
}

export const SelectPersonaList = wrap
  .ErrorBoundary({ fallback: <div>error</div> })
  .Suspense({
    fallback: (
      <div className={flexOverflowStyle}>
        <BannerSkeletonList length={6} size="small" />
      </div>
    ),
  })
  .on(function SelectPersonaList({ selectPersona, onSelectPersona }: SelectPersonaListProps) {
    const { name } = useClientUser();
    const { data } = useSuspenseQuery(userQueries.allPersonasOptions(name));
    const t = useTranslations('Mypage.Filter');

    const { filteredList, filterState, updateFilter, resetFilter, isFiltering, counts } = usePersonaListFilter(
      data.personas,
    );

    return (
      <section className={sectionStyle}>
        <PersonaListToolbar
          filterState={filterState}
          onFilterChange={updateFilter}
          onReset={resetFilter}
          counts={counts}
          isFiltering={isFiltering}
          showSearch
        />
        {filteredList.length === 0 ? (
          <p className={emptyStyle}>{t('no-results')}</p>
        ) : (
          <div className={flexOverflowStyle}>
            {filteredList.map((persona) => (
              <MemoizedLevelPersonaItem
                key={persona.id}
                persona={persona}
                isSelected={selectPersona.includes(persona.id)}
                onClick={() => onSelectPersona(persona)}
                size="small"
              />
            ))}
          </div>
        )}
      </section>
    );
  });

const sectionStyle = 'h-full max-h-[50vh] min-h-[164px] flex flex-col gap-[16px]';

const emptyStyle = 'glyph14-regular text-white-50 text-center py-[24px]';
