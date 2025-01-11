/* eslint-disable @next/next/no-img-element */
'use client';

import { memo, useState } from 'react';
import { css, cx } from '_panda/css';
import type { Persona } from '@gitanimals/api';
import { userQueries } from '@gitanimals/react-query';
import { Button, LevelBanner } from '@gitanimals/ui-panda';
import { BannerSkeletonList } from '@gitanimals/ui-panda/src/components/Banner/Banner';
import { wrap } from '@suspensive/react';
import { useSuspenseQuery } from '@tanstack/react-query';

import { customScrollStyle } from '@/styles/scrollStyle';
import { useClientUser } from '@/utils/clientAuth';
import { getPersonaImage } from '@/utils/image';

export const GuildJoinPetSelectDialog = ({ onSubmit }: { onSubmit: (selectPersona: string) => void }) => {
  const [selectPersona, setSelectPersona] = useState<string>();

  const onSelectPersona = (currentSelectPersona: Persona) => {
    setSelectPersona(currentSelectPersona.id);
  };

  const onDone = () => {
    if (selectPersona) {
      onSubmit(selectPersona);
    }
  };

  return (
    <>
      <SelectPersonaList selectPersona={selectPersona ? [selectPersona] : []} onSelectPersona={onSelectPersona} />
      <Button mx="auto" w="100px" onClick={onDone} disabled={!selectPersona}>
        Done
      </Button>
    </>
  );
};

interface SelectPersonaListProps {
  selectPersona: string[];
  onSelectPersona: (persona: Persona) => void;
  initSelectPersonas?: (list: Persona[]) => void;
  loadingPersona?: string[];
}

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

const SelectPersonaList = wrap
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

const sectionStyle = css({
  height: '100%',
  maxHeight: '50vh',
  minHeight: '164px',
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
});

interface PersonaItemProps {
  persona: Persona;
  isSelected: boolean;
  onClick: () => void;
}

function PersonaItem({ persona, isSelected, onClick }: PersonaItemProps) {
  return (
    <button onClick={onClick} className={css({ outline: 'none', bg: 'transparent' })}>
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
