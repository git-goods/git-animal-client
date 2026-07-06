'use client';

import { createContext, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import type { Persona } from '@gitanimals/api';
import { userQueries } from '@gitanimals/react-query';
import { BannerSkeleton, cn } from '@gitanimals/ui-tailwind';
import { wrap } from '@suspensive/react';
import { useSuspenseQuery } from '@tanstack/react-query';
import useEmblaCarousel from 'embla-carousel-react';

import { NextButton, PrevButton, usePrevNextButtons } from '@/components/EmblaCarousel/EmblaCarouselArrowButtons';
import { DotButton, useDotButton } from '@/components/EmblaCarousel/EmblaCarouselDotButton';
import { MemoizedBannerPersonaItem } from '@/components/PersonaItem';
import { PersonaListToolbar } from '@/components/PersonaListToolbar';
import type { PersonaFilterState } from '@/hooks/persona/usePersonaListFilter';
import { usePersonaListFilter } from '@/hooks/persona/usePersonaListFilter';
import { useClientUser } from '@/utils/clientAuth';

// ─── Context ────────────────────────────────────────────────────────

interface SelectPersonaListContextValue {
  filterState: PersonaFilterState;
  updateFilter: (partial: Partial<PersonaFilterState>) => void;
  resetFilter: () => void;
  counts: { filtered: number; total: number };
  isFiltering: boolean;
  filteredList: Persona[];
  selectedIds: Set<string>;
  onSelectPersona: (persona: Persona) => void;
  loadingPersona?: string[];
  isSpecialEffect?: boolean;
}

const SelectPersonaListContext = createContext<SelectPersonaListContextValue | null>(null);

function useSelectPersonaListContext() {
  const ctx = useContext(SelectPersonaListContext);
  if (!ctx) throw new Error('SelectPersonaList compound components must be used within <SelectPersonaList>');
  return ctx;
}

// ─── Styles ─────────────────────────────────────────────────────────

const listStyle = cn(
  'gap-[4px] grid grid-cols-[repeat(auto-fill,minmax(64px,auto))]',
  'mobile:grid-cols-[repeat(auto-fill,minmax(52px,auto))]',
);

const emptyStyle = 'glyph14-regular text-white-50 text-center px-0 py-[24px]';

// ─── Sub-components ─────────────────────────────────────────────────

interface ToolbarProps {
  showSearch?: boolean;
  showVisibilityFilter?: boolean;
  showEvolvableFilter?: boolean;
}

function Toolbar({ showSearch, showVisibilityFilter, showEvolvableFilter }: ToolbarProps) {
  const { filterState, updateFilter, resetFilter, counts, isFiltering } = useSelectPersonaListContext();

  return (
    <PersonaListToolbar
      filterState={filterState}
      onFilterChange={updateFilter}
      onReset={resetFilter}
      counts={counts}
      isFiltering={isFiltering}
      showSearch={showSearch}
      showVisibilityFilter={showVisibilityFilter}
      showEvolvableFilter={showEvolvableFilter}
    />
  );
}

function Grid() {
  const t = useTranslations('Mypage.Filter');
  const { filteredList, selectedIds, onSelectPersona, loadingPersona, isSpecialEffect } = useSelectPersonaListContext();

  if (filteredList.length === 0) {
    return <p className={emptyStyle}>{t('no-results')}</p>;
  }

  return (
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
}

// ─── InventoryGrid (Embla carousel + dynamic grid) ─────────────────

const MAX_DOTS = 5;

// 컨테이너 너비에서 컬럼 수 계산 (순수 함수)
function computeCols(width: number, minItemSize: number, gap: number): number {
  if (width <= 0) return 0;
  return Math.max(Math.floor((width + gap) / (minItemSize + gap)), 1);
}

// cols는 항상 너비에서 계산. rows는 prop(고정) 또는 'auto'(gridArea 높이에서 도출).
// 그리드 높이는 cols/rows에서 직접 계산하므로, 고정 rows일 땐 부모 높이 제약이 필요 없다.
function useGridLayout(rows: number | 'auto', minRows: number, minItemSize: number, gap: number) {
  const containerRef = useRef<HTMLDivElement>(null);
  const gridAreaRef = useRef<HTMLDivElement>(null);
  const [cols, setCols] = useState(0);
  const [resolvedRows, setResolvedRows] = useState(typeof rows === 'number' ? rows : 0);
  const [gridHeight, setGridHeight] = useState(0);

  useEffect(() => {
    const widthEl = containerRef.current;
    if (!widthEl) return;

    const measure = () => {
      const width = widthEl.offsetWidth;
      // reInit 중 컨테이너가 일시적으로 축소될 수 있으므로 비정상 폭은 무시
      if (width < minItemSize * 2) return;
      const nextCols = computeCols(width, minItemSize, gap);

      // 아이템이 정사각형이므로 컬럼 너비 = 행 높이
      const colWidth = (width - (nextCols - 1) * gap) / nextCols;
      const rowHeight = colWidth + gap;

      let nextRows: number;
      if (rows === 'auto') {
        const available = gridAreaRef.current?.clientHeight ?? 0;
        if (available <= 0) return;
        nextRows = Math.max(Math.floor(available / rowHeight), minRows);
      } else {
        nextRows = rows;
      }
      const nextGridHeight = nextRows * rowHeight - gap;

      setCols((prev) => (prev === nextCols ? prev : nextCols));
      setResolvedRows((prev) => (prev === nextRows ? prev : nextRows));
      setGridHeight((prev) => (prev === nextGridHeight ? prev : nextGridHeight));
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(widthEl);
    if (rows === 'auto' && gridAreaRef.current) observer.observe(gridAreaRef.current);
    return () => observer.disconnect();
  }, [rows, minRows, minItemSize, gap]);

  const ready = cols > 0 && resolvedRows > 0;
  return { containerRef, gridAreaRef, cols, rows: resolvedRows, gridHeight, ready };
}

interface InventoryGridProps {
  /** 페이지당 행 수. 고정값 또는 부모 높이에 맞추는 'auto' (기본 3) */
  rows?: number | 'auto';
  /** rows='auto'일 때 최소 행 수 바닥값 (기본 1). 고정 rows에는 영향 없음 */
  minRows?: number;
  minItemSize?: number;
  gap?: number;
}

function InventoryGrid({ rows = 3, minRows = 1, minItemSize = 64, gap = 4 }: InventoryGridProps) {
  const t = useTranslations('Mypage.Filter');
  const { filteredList, selectedIds, onSelectPersona, loadingPersona, isSpecialEffect } = useSelectPersonaListContext();

  const {
    containerRef,
    gridAreaRef,
    cols,
    rows: resolvedRows,
    gridHeight,
    ready,
  } = useGridLayout(rows, minRows, minItemSize, gap);
  const itemsPerPage = cols * resolvedRows;

  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    slidesToScroll: 1,
    containScroll: 'trimSnaps',
    skipSnaps: false,
    watchDrag: true,
  });

  const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(emblaApi);
  const { prevBtnDisabled, nextBtnDisabled, onPrevButtonClick, onNextButtonClick } = usePrevNextButtons(emblaApi);

  // 그리드 치수나 콘텐츠가 바뀌면 embla 재계산
  useEffect(() => {
    if (ready && emblaApi) {
      emblaApi.reInit();
      emblaApi.scrollTo(0, true);
    }
  }, [emblaApi, ready, cols, resolvedRows, itemsPerPage, filteredList.length]);

  const pages = useMemo(() => {
    if (!ready) return [];
    const result: Persona[][] = [];
    for (let i = 0; i < filteredList.length; i += itemsPerPage) {
      result.push(filteredList.slice(i, i + itemsPerPage));
    }
    return result.length > 0 ? result : [[]];
  }, [filteredList, itemsPerPage, ready]);

  if (filteredList.length === 0) {
    return <p className={emptyStyle}>{t('no-results')}</p>;
  }

  return (
    <div ref={containerRef} className="flex flex-col flex-1 gap-[8px] h-full min-h-0 overflow-hidden">
      {/* 네비게이션: 화살표(좌) + 닷(우) — 항상 렌더, 초기엔 disabled/empty */}
      <div className="flex justify-between items-center">
        <div className="flex gap-[10px]">
          <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} className="w-[24px] h-[24px]" />
          <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} className="w-[24px] h-[24px]" />
        </div>
        <div className="flex gap-[4px]">
          {ready &&
            (() => {
              const total = scrollSnaps.length;
              const start = total <= MAX_DOTS ? 0 : Math.min(Math.max(selectedIndex - 2, 0), total - MAX_DOTS);
              const end = start + Math.min(total, MAX_DOTS);
              return scrollSnaps.slice(start, end).map((_, i) => {
                const index = start + i;
                return (
                  <DotButton
                    key={index}
                    onClick={() => onDotButtonClick(index)}
                    className={cn(index === selectedIndex && 'selected')}
                  />
                );
              });
            })()}
        </div>
      </div>

      {/* 그리드 영역: rows='auto'일 때만 gridAreaRef 높이로 rows를 도출 */}
      <div ref={gridAreaRef} className="flex-1 min-h-0 overflow-hidden">
        {ready && (
          <div className="w-full h-full overflow-hidden [&>div]:!min-w-0" ref={emblaRef}>
            <div className="flex h-full">
              {pages.map((page, pageIdx) => (
                <div key={pageIdx} className="flex-[0_0_100%] min-w-0 overflow-hidden">
                  <div
                    className="grid overflow-hidden"
                    style={{
                      gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
                      gridTemplateRows: `repeat(${resolvedRows}, minmax(0, 1fr))`,
                      gap: `${gap}px`,
                      height: `${gridHeight}px`,
                    }}
                  >
                    {page.map((persona) => (
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
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Root ───────────────────────────────────────────────────────────

interface Props {
  selectPersona?: string[];
  onSelectPersona: (persona: Persona) => void;
  initSelectPersonas?: (list: Persona[]) => void;
  loadingPersona?: string[];
  isSpecialEffect?: boolean;
  children?: React.ReactNode;
}

const Root = wrap
  .ErrorBoundary({
    fallback: <div>error</div>,
  })
  .Suspense({
    fallback: (
      <div className={cn(listStyle, 'min-h-[64px]')}>
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
    children,
  }: Props) {
    const { name } = useClientUser();
    const { data } = useSuspenseQuery(userQueries.allPersonasOptions(name));
    const hasInitialized = useRef(false);

    const { filteredList, filterState, updateFilter, resetFilter, isFiltering, counts } = usePersonaListFilter(
      data.personas,
    );

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

    const contextValue: SelectPersonaListContextValue = useMemo(
      () => ({
        filterState,
        updateFilter,
        resetFilter,
        counts,
        isFiltering,
        filteredList,
        selectedIds,
        onSelectPersona,
        loadingPersona,
        isSpecialEffect,
      }),
      [
        filterState,
        updateFilter,
        resetFilter,
        counts,
        isFiltering,
        filteredList,
        selectedIds,
        onSelectPersona,
        loadingPersona,
        isSpecialEffect,
      ],
    );

    return (
      <SelectPersonaListContext.Provider value={contextValue}>{children ?? <Grid />}</SelectPersonaListContext.Provider>
    );
  });

// ─── Export ─────────────────────────────────────────────────────────

export const SelectPersonaList = Object.assign(Root, {
  Toolbar,
  Grid,
  InventoryGrid,
});
