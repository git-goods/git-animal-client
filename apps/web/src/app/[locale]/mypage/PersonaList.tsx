'use client';

import React, { useEffect, useMemo } from 'react';
import { css } from '_panda/css';
import type { Persona } from '@gitanimals/api';
import { userQueries } from '@gitanimals/react-query';
import { Banner } from '@gitanimals/ui-panda';
import { BannerSkeleton } from '@gitanimals/ui-panda/src/components/Banner/Banner';
import { wrap } from '@suspensive/react';
import { useSuspenseQuery } from '@tanstack/react-query';

import { useClientUser } from '@/utils/clientAuth';
import { getPersonaImage } from '@/utils/image';

interface Props {
  selectPersona: string[];
  onSelectPersona: (persona: Persona) => void;
  initSelectPersonas?: (list: Persona[]) => void;
  loadingPersona?: string[];
}

export const personaListScrollStyle = css({
  '&::-webkit-scrollbar': {
    height: '4px',
    width: '4px',
  },
  '&::-webkit-scrollbar-track': {
    backgroundColor: 'white.white_10',
    borderRadius: '2px',
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: 'white.white_25',
    borderRadius: '2px',
  },
});

export const SelectPersonaList = wrap
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

  .on(function SelectPersonaList({ selectPersona, onSelectPersona, initSelectPersonas, loadingPersona }: Props) {
    const { name } = useClientUser();
    const { data } = useSuspenseQuery(userQueries.allPersonasOptions(name));

    // 초기 선택 로직, 외부에서 초기화 함수 전달
    useEffect(() => {
      if (initSelectPersonas) {
        initSelectPersonas(data.personas);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data]);

    const viewList = useMemo(() => {
      const viewListSorted = data.personas.sort((a, b) => {
        if (a.visible && !b.visible) return -1;
        if (!a.visible && b.visible) return 1;
        return parseInt(a.level) - parseInt(b.level);
      });

      return viewListSorted;
    }, [data]);

    return (
      <>
        {viewList.map((persona) => (
          <button
            key={`${persona.id}-${persona.visible}`}
            onClick={() => onSelectPersona(persona)}
            disabled={loadingPersona?.includes(persona.id)}
            className={css({ outline: 'none' })}
          >
            <Banner
              loading={loadingPersona?.includes(persona.id)}
              image={getPersonaImage(persona.type)}
              size="small"
              selected={selectPersona.includes(persona.id)}
            />
          </button>
        ))}
      </>
    );
  });
