'use client';

import { css, cx } from '_panda/css';
import type { Persona } from '@gitanimals/api';
import { userQueries } from '@gitanimals/react-query';
import { BannerSkeletonList } from '@gitanimals/ui-panda/src/components/Banner/Banner';
import { wrap } from '@suspensive/react';
import { useSuspenseQuery } from '@tanstack/react-query';

import { MemoizedLevelPersonaItem } from '@/components/PersonaItem';
import { customScrollStyle } from '@/styles/scrollStyle';
import { useClientUser } from '@/utils/clientAuth';

const flexOverflowStyle = cx(
  css({
    display: 'flex',
    overflowY: 'auto',
    overflowX: 'hidden',
    width: '100%',
    gap: '4px',
    height: '100%',
    minHeight: '0',
    flexWrap: 'wrap',
    maxHeight: '100%',
  }),
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

    // TODO: 정렬
    return (
      <section className={sectionStyle}>
        <div className={flexOverflowStyle}>
          {data.personas.map((persona) => (
            <MemoizedLevelPersonaItem
              key={persona.id}
              persona={persona}
              isSelected={selectPersona.includes(persona.id)}
              onClick={() => onSelectPersona(persona)}
              size="small"
            />
          ))}
        </div>
      </section>
    );
  });

const sectionStyle = css({
  height: '100%',
  maxHeight: '50vh',
  minHeight: '164px',
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
});

