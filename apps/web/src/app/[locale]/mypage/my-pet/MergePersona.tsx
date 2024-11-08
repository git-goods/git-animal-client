'use client';

import React, { useState } from 'react';
import { css, cx } from '_panda/css';
import { flex } from '_panda/patterns';
import type { Persona } from '@gitanimals/api';
import { userQueries } from '@gitanimals/react-query';
import { Banner, FullModalBase } from '@gitanimals/ui-panda';
import { BannerSkeleton } from '@gitanimals/ui-panda/src/components/Banner/Banner';
import { wrap } from '@suspensive/react';
import { useSuspenseQuery } from '@tanstack/react-query';

import { customScrollStyle } from '@/styles/scrollStyle';
import { useClientUser } from '@/utils/clientAuth';
import { getPersonaImage } from '@/utils/image';

import MergeAnimation from './Merging';

function MergePersona() {
  const [selectPersona, setSelectPersona] = useState<Persona[]>([]);

  const onSelectPersona = (persona: Persona) => {
    if (selectPersona.find((p) => p.id === persona.id)) {
      setSelectPersona((prev) => prev.filter((p) => p.id !== persona.id));
    } else {
      if (selectPersona.length >= 2) return;
      setSelectPersona((prev) => [...prev, persona]);
    }
  };

  const targetPersona = selectPersona.length > 0 ? selectPersona[0] : undefined;
  const materialPersona = selectPersona.length > 1 ? selectPersona[1] : undefined;

  return (
    <FullModalBase isOpen={true} onClose={() => {}}>
      <MergeAnimation targetPersona={targetPersona} materialPersona={materialPersona} />

      <div
        className={cx(
          css({
            maxHeight: 'calc(100vh - 542px)',
            overflow: 'auto',
          }),
          listStyle,
        )}
      >
        <SelectPersonaList
          selectPersona={selectPersona.map((persona) => persona.id)}
          onSelectPersona={onSelectPersona}
        />
      </div>
    </FullModalBase>
  );
}

export default MergePersona;

const listStyle = cx(
  flex({
    gap: 4,
    w: '100%',
    h: '100%',
    minH: '0',
    overflowY: 'auto',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
  }),
  customScrollStyle,
);

interface SelectPersonaListProps {
  selectPersona: string[];
  onSelectPersona: (persona: Persona) => void;
  initSelectPersonas?: (list: Persona[]) => void;
  loadingPersona?: string[];
}

const SelectPersonaList = wrap
  .ErrorBoundary({
    // TODO: 공통 에러 컴포넌트로 대체
    fallback: <div>error</div>,
  })
  .Suspense({
    fallback: (
      <>
        {Array.from({ length: 6 }).map((_, index) => (
          <BannerSkeleton key={index} size="small" />
        ))}
      </>
    ),
  })
  .on(function SelectPersonaList({ selectPersona, onSelectPersona }: SelectPersonaListProps) {
    const { name } = useClientUser();
    const { data } = useSuspenseQuery(userQueries.allPersonasOptions(name));

    return (
      <>
        {data.personas.map((persona) => (
          <button
            key={`${persona.id}-${persona.visible}`}
            onClick={() => onSelectPersona(persona)}
            // disabled={loadingPersona?.includes(persona.id)}
            className={css({ outline: 'none' })}
          >
            <Banner
              // loading={loadingPersona?.includes(persona.id)}
              image={getPersonaImage(persona.type)}
              size="small"
              selected={selectPersona.includes(persona.id)}
            />
          </button>
        ))}
      </>
    );
  });
