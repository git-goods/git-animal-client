'use client';

import { useTranslations } from 'next-intl';
import type { Persona } from '@gitanimals/api';
import { userQueries } from '@gitanimals/react-query';
import { cn, Skeleton } from '@gitanimals/ui-tailwind';
import { wrap } from '@suspensive/react';
import { useSuspenseQuery } from '@tanstack/react-query';

import { MemoizedLevelPersonaItem } from '@/entities/persona/ui/PersonaItem';
import { PersonaListToolbar } from '@/entities/persona/ui/PersonaListToolbar';
import { usePersonaListFilter } from '@/entities/persona/model/usePersonaListFilter';
import { customScrollStyle } from '@/shared/styles/scrollStyle';
import { useClientUser } from '@/shared/utils/clientAuth';

const flexOverflowStyle = cn(
  'flex overflow-y-auto overflow-x-hidden w-full gap-1 h-full min-h-0 flex-wrap max-h-full',
  customScrollStyle,
);

function BannerSkeletonList({ length }: { length: number }) {
  return (
    <>
      {Array.from({ length }).map((_, index) => (
        <Skeleton key={index} className="w-[80px] h-[100px] rounded-lg" />
      ))}
    </>
  );
}

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
        <BannerSkeletonList length={6} />
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

const sectionStyle = cn('h-full max-h-[50vh] min-h-[164px] flex flex-col gap-4');

const emptyStyle = cn('text-glyph-14 text-white-50 text-center py-6');
