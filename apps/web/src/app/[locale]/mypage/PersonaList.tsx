'use client';

import { useEffect, useMemo, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { css, cx } from '_panda/css';
import type { Persona } from '@gitanimals/api';
import { userQueries } from '@gitanimals/react-query';
import { BannerSkeleton } from '@gitanimals/ui-panda';
import { wrap } from '@suspensive/react';
import { useSuspenseQuery } from '@tanstack/react-query';

import { MemoizedBannerPersonaItem } from '@/components/PersonaItem';
import { PersonaListToolbar, type PersonaListToolbarProps } from '@/components/PersonaListToolbar';
import { usePersonaListFilter } from '@/hooks/persona/usePersonaListFilter';
import { useClientUser } from '@/utils/clientAuth';

export type RenderToolbarProps = Pick<PersonaListToolbarProps, 'filterState' | 'onFilterChange' | 'onReset' | 'counts' | 'isFiltering'>;

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

  /** 툴바 표시 여부 (기본: false) */
  showToolbar?: boolean;
  /** 검색바 표시 여부 */
  showSearch?: boolean;
  /** 가시성 필터 표시 여부 */
  showVisibilityFilter?: boolean;
  /** 진화 가능 필터 표시 여부 */
  showEvolvableFilter?: boolean;
  /** 툴바를 외부에서 렌더링하기 위한 render prop. 전달 시 내부 툴바 대신 이 함수로 위임 */
  renderToolbar?: (props: RenderToolbarProps) => React.ReactNode;
  /** 그리드 영역을 감싸는 wrapper. renderToolbar와 함께 사용하여 스크롤 영역 분리에 활용 */
  gridWrapper?: React.ComponentType<{ children: React.ReactNode }>;
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
    showToolbar = false,
    showSearch = false,
    showVisibilityFilter = false,
    showEvolvableFilter = false,
    renderToolbar,
    gridWrapper: GridWrapper,
  }: Props) {
    const t = useTranslations('Mypage.Filter');
    const { name } = useClientUser();
    const { data } = useSuspenseQuery(userQueries.allPersonasOptions(name));
    const hasInitialized = useRef(false);

    const { filteredList, filterState, updateFilter, resetFilter, isFiltering, counts } = usePersonaListFilter(
      data.personas,
    );

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

    const toolbarProps: RenderToolbarProps = { filterState, onFilterChange: updateFilter, onReset: resetFilter, counts, isFiltering };

    const grid = filteredList.length === 0 ? (
      <p className={emptyStyle}>{t('no-results')}</p>
    ) : (
      <div className={listStyle}>
        {filteredList.map((persona) => (
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

    if (renderToolbar) {
      const wrappedGrid = GridWrapper ? <GridWrapper>{grid}</GridWrapper> : grid;
      return (
        <>
          {renderToolbar(toolbarProps)}
          {wrappedGrid}
        </>
      );
    }

    return (
      <div>
        {showToolbar && (
          <PersonaListToolbar
            {...toolbarProps}
            showSearch={showSearch}
            showVisibilityFilter={showVisibilityFilter}
            showEvolvableFilter={showEvolvableFilter}
          />
        )}
        {grid}
      </div>
    );
  });

const emptyStyle = css({
  textStyle: 'glyph14.regular',
  color: 'white.white_50',
  textAlign: 'center',
  padding: '24px 0',
});
