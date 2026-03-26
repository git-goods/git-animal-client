'use client';

import { useEffect, useMemo, useRef } from 'react';
import { css, cx } from '_panda/css';
import type { Persona } from '@gitanimals/api';
import { userQueries } from '@gitanimals/react-query';
import { BannerSkeleton } from '@gitanimals/ui-panda';
import { wrap } from '@suspensive/react';
import { useSuspenseQuery } from '@tanstack/react-query';

import { MemoizedBannerPersonaItem } from '@/components/PersonaItem';
import { getPersonaGradePriority } from '@/utils/animals';
import { useClientUser } from '@/utils/clientAuth';

const listStyle = css({
  gap: '4px',
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(64px, auto))',
  _mobile: {
    gridTemplateColumns: 'repeat(auto-fill, minmax(52px, auto))',
  },
});

interface Props {
  /** 선택된 페르소나 ID 목록. 미전달 시 서버 데이터의 visible 필드를 사용 */
  selectPersona?: string[];
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
      <div className={cx(listStyle, css({ minH: '64px' }))}>
        {Array.from({ length: 6 }).map((_, index) => (
          <BannerSkeleton key={index} size="full" />
        ))}
      </div>
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

    // 초기 선택 로직, 외부에서 초기화 함수 전달 (마운트 시 한 번만 호출)
    useEffect(() => {
      if (initSelectPersonas && !hasInitialized.current && data.personas.length > 0) {
        hasInitialized.current = true;
        initSelectPersonas(data.personas);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const selectedIds = useMemo(
      () => new Set(selectPersona ?? data.personas.filter((p) => p.visible).map((p) => p.id)),
      [selectPersona, data],
    );

    const viewList = useMemo(() => {
      return [...data.personas].sort((a, b) => {
        const gradeDiff = getPersonaGradePriority(a.grade) - getPersonaGradePriority(b.grade);
        if (gradeDiff !== 0) return gradeDiff;

        if (a.visible && !b.visible) return -1;
        if (!a.visible && b.visible) return 1;

        return parseInt(b.level) - parseInt(a.level);
      });
    }, [data]);

    return (
      <div className={listStyle}>
        {viewList.map((persona) => (
          <MemoizedBannerPersonaItem
            key={persona.id}
            persona={persona}
            isSelected={selectedIds.has(persona.id)}
            onClick={() => onSelectPersona(persona)}
            loading={loadingPersona?.includes(persona.id) ?? false}
            isSpecialEffect={isSpecialEffect}
          />
        ))}
      </div>
    );
  });
