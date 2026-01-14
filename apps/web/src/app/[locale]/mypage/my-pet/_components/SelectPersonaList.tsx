'use client';

import { memo } from 'react';
import { useTranslations } from 'next-intl';
import type { Persona } from '@gitanimals/api';
import { userQueries } from '@gitanimals/react-query';
import { cn, Skeleton, LevelBanner } from '@gitanimals/ui-tailwind';
import { wrap } from '@suspensive/react';
import { useSuspenseQuery } from '@tanstack/react-query';

import { customScrollStyle } from '@/styles/scrollStyle';
import { useClientUser } from '@/utils/clientAuth';
import { getPersonaImage } from '@/utils/image';

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
  .Suspense({ fallback: <BannerSkeletonList length={6} /> })
  .on(function SelectPersonaList({ selectPersona, onSelectPersona }: SelectPersonaListProps) {
    const { name } = useClientUser();
    const { data } = useSuspenseQuery(userQueries.allPersonasOptions(name));
    const t = useTranslations('Mypage.Merge');

    // TODO: 정렬
    return (
      <section className="h-full max-h-full min-h-0 flex flex-col gap-4">
        <div className="font-product text-glyph-16 text-white/50 flex justify-between">
          <p>{t('please-choose-pet')}</p>
        </div>
        <div
          className={cn(
            'flex overflow-y-auto overflow-x-hidden w-full gap-1 h-full min-h-0 flex-wrap max-h-[calc(100%-24px)]',
            customScrollStyle,
          )}
        >
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

interface PersonaItemProps {
  persona: Persona;
  isSelected: boolean;
  onClick: () => void;
}

function PersonaItem({ persona, isSelected, onClick }: PersonaItemProps) {
  return (
    <button onClick={onClick} className="outline-none bg-transparent">
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
