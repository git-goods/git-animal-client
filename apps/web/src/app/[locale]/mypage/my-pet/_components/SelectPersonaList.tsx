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

interface SelectPersonaListProps {
  selectPersona: string[];
  onSelectPersona: (persona: Persona) => void;
  initSelectPersonas?: (list: Persona[]) => void;
  loadingPersona?: string[];
}
export const SelectPersonaList = wrap
  .ErrorBoundary({ fallback: <div>error</div> })
  .Suspense({ fallback: <BannerSkeletonList length={6} size="small" /> })
  .on(function SelectPersonaList({ selectPersona, onSelectPersona }: SelectPersonaListProps) {
    const { name } = useClientUser();
    const { data } = useSuspenseQuery(userQueries.allPersonasOptions(name));
    const t = useTranslations('Mypage.Merge');
    const tFilter = useTranslations('Mypage.Filter');

    const { filteredList, filterState, updateFilter, resetFilter, isFiltering, counts } = usePersonaListFilter(
      data.personas,
    );

    return (
      <section className={sectionStyle}>
        <div className={listSectionTitleStyle}>
          <p>{t('please-choose-pet')}</p>
        </div>
        <PersonaListToolbar
          filterState={filterState}
          onFilterChange={updateFilter}
          onReset={resetFilter}
          counts={counts}
          isFiltering={isFiltering}
          showSearch
        />
        {filteredList.length === 0 ? (
          <p className={emptyStyle}>{tFilter('no-results')}</p>
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

const sectionStyle = 'h-full max-h-full min-h-0 flex flex-col gap-[16px]';

const listSectionTitleStyle = 'glyph16-regular text-white-50 flex justify-between';

const flexOverflowStyle = cn(
  'grid grid-cols-[repeat(auto-fill,_80px)] auto-rows-[80px] justify-start overflow-y-auto overflow-x-hidden w-full gap-[8px] h-full min-h-0 max-h-[calc(100%_-_24px)] mobile:grid-cols-[repeat(auto-fill,_52px)] mobile:auto-rows-[52px]',
  customScrollStyle,
);

const emptyStyle = 'glyph14-regular text-white-50 text-center px-0 py-[24px]';
