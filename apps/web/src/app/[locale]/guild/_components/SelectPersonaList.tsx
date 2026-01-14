'use client';

import { memo } from 'react';
import { cn, Skeleton } from '@gitanimals/ui-tailwind';
import { LevelBanner } from '@gitanimals/ui-panda';
import type { Persona } from '@gitanimals/api';
import { userQueries } from '@gitanimals/react-query';
import { wrap } from '@suspensive/react';
import { useSuspenseQuery } from '@tanstack/react-query';

import { customScrollStyle } from '@/styles/scrollStyle';
import { useClientUser } from '@/utils/clientAuth';
import { getPersonaImage } from '@/utils/image';

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

    // TODO: 정렬
    return (
      <section className={sectionStyle}>
        <div className={flexOverflowStyle}>
          {data.personas.map((persona) => (
            <MemoizedPersonaItem
              key={persona.id}
              persona={persona}
              isSelected={selectPersona.includes(persona.id)}
              onClick={() => onSelectPersona(persona)}
            />
          ))}
        </div>
      </section>
    );
  });

const sectionStyle = cn('h-full max-h-[50vh] min-h-[164px] flex flex-col gap-4');

interface PersonaItemProps {
  persona: Persona;
  isSelected: boolean;
  onClick: () => void;
}

function PersonaItem({ persona, isSelected, onClick }: PersonaItemProps) {
  return (
    <button onClick={onClick} className={cn('outline-none bg-transparent')}>
      <LevelBanner
        image={getPersonaImage(persona.type)}
        status={isSelected ? 'selected' : 'default'}
        level={Number(persona.level)}
        size="small"
      />
    </button>
  );
}

const MemoizedPersonaItem = memo(PersonaItem, (prev, next) => {
  return prev.isSelected === next.isSelected && prev.persona.level === next.persona.level;
});
