'use client';

import React, { memo, useEffect, useMemo } from 'react';
import { css } from '_panda/css';
import type { Persona } from '@gitanimals/api';
import { userQueries } from '@gitanimals/react-query';
import { Banner } from '@gitanimals/ui-panda';
import { BannerSkeleton } from '@gitanimals/ui-panda/src/components/Banner/Banner';
import { wrap } from '@suspensive/react';
import { useQuery, useSuspenseQuery } from '@tanstack/react-query';

import { getPersonaImage } from '@/utils/image';
import { useUser } from '@/hooks/useUser';

interface Props {
  selectPersona: string[];
  onSelectPersona: (persona: Persona) => void;
  initSelectPersonas?: (list: Persona[]) => void;
  loadingPersona?: string[];
}

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
    const { data: userData } = useSuspenseQuery({ ...userQueries.userOptions() });
    const { data } = useSuspenseQuery(userQueries.allPersonasOptions(userData.username));

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
          <MemoizedPersonaItem
            key={persona.id}
            persona={persona}
            isSelected={selectPersona.includes(persona.id)}
            onClick={() => onSelectPersona(persona)}
            isLoading={loadingPersona?.includes(persona.id) ?? false}
          />
        ))}
      </>
    );
  });

interface PersonaItemProps {
  persona: Persona;
  isSelected: boolean;
  onClick: () => void;
  isLoading: boolean;
}

function PersonaItem({ persona, isSelected, onClick, isLoading }: PersonaItemProps) {
  return (
    <button
      key={`${persona.id}-${persona.visible}`}
      onClick={onClick}
      disabled={isLoading}
      className={css({ outline: 'none' })}
    >
      <Banner
        loading={isLoading}
        image={getPersonaImage(persona.type)}
        size="small"
        status={isSelected ? 'selected' : 'default'}
      />
    </button>
  );
}

const MemoizedPersonaItem = memo(PersonaItem);
