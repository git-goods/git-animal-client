'use client';

import React, { memo, useEffect, useMemo, useRef } from 'react';
import { css, cx } from '_panda/css';
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

  isSpecialEffect?: boolean;
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

  .on(function SelectPersonaList({
    selectPersona,
    isSpecialEffect,
    onSelectPersona,
    initSelectPersonas,
    loadingPersona,
  }: Props) {
    const { name } = useClientUser();
    const { data } = useSuspenseQuery(userQueries.allPersonasOptions(name));
    const hasInitialized = useRef(false);

    // 초기 선택 로직, 외부에서 초기화 함수 전달
    useEffect(() => {
      if (initSelectPersonas && !hasInitialized.current && data.personas.length > 0) {
        hasInitialized.current = true;
        initSelectPersonas(data.personas);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data]);

    console.log('data.personas', data.personas);

    const gradeSortedList = useMemo(() => {
      // COLLABORATOR, EVOLUTION, DEFAULT 순으로 정렬
      return data.personas.sort((a, b) => {
        if (a.grade === 'COLLABORATOR') return -1;
        if (a.grade === 'EVOLUTION') return 1;
        return 0;
      });
    }, [data]);

    const viewList = useMemo(() => {
      const viewListSorted = gradeSortedList.sort((a, b) => {
        if (a.visible && !b.visible) return -1;
        if (!a.visible && b.visible) return 1;
        return parseInt(b.level) - parseInt(a.level);
      });

      return viewListSorted;
    }, [gradeSortedList]);

    return (
      <>
        {viewList.map((persona) => (
          <MemoizedPersonaItem
            key={persona.id}
            persona={persona}
            isSelected={selectPersona.includes(persona.id)}
            onClick={() => onSelectPersona(persona)}
            isLoading={loadingPersona?.includes(persona.id) ?? false}
            isSpecialEffect={isSpecialEffect}
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

  isSpecialEffect?: boolean;
}

function PersonaItem({ persona, isSelected, onClick, isSpecialEffect, isLoading }: PersonaItemProps) {
  return (
    <button
      key={`${persona.id}-${persona.visible}`}
      onClick={onClick}
      disabled={isLoading}
      className={cx(
        css({ outline: 'none', borderRadius: '12px' }),
        isSpecialEffect && persona.isEvolutionable && 'gradient-move',
      )}
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
