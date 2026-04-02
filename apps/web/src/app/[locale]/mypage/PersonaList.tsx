'use client';

import { createContext, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import type { Persona } from '@gitanimals/api';
import { userQueries } from '@gitanimals/react-query';
import { cn, Skeleton } from '@gitanimals/ui-tailwind';
import { wrap } from '@suspensive/react';
import { useSuspenseQuery } from '@tanstack/react-query';
import useEmblaCarousel from 'embla-carousel-react';

import { NextButton, PrevButton, usePrevNextButtons } from '@/components/EmblaCarousel/EmblaCarouselArrowButtons';
import { DotButton, useDotButton } from '@/components/EmblaCarousel/EmblaCarouselDotButton';
import type { PersonaFilterState } from '@/entities/persona/model/usePersonaListFilter';
import { usePersonaListFilter } from '@/entities/persona/model/usePersonaListFilter';
import { MemoizedBannerPersonaItem } from '@/entities/persona/ui/PersonaItem';
import { PersonaListToolbar } from '@/entities/persona/ui/PersonaListToolbar';
import { useClientUser } from '@/shared/utils/clientAuth';

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
  'gap-1 grid grid-cols-[repeat(auto-fill,minmax(64px,auto))]',
  'max-mobile:grid-cols-[repeat(auto-fill,minmax(52px,auto))]',
);

const emptyStyle = cn('font-product text-glyph-14 text-white-50 text-center py-6');

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
const NAV_HEIGHT = 44; // arrows + dots bar
/** 다이얼로그 크롬: 제목(50) + 검색(40) + 필터(40) + 패딩/갭(30) + nav(44) */
const DIALOG_CHROME_HEIGHT = 204;
const INLINE_CHROME_HEIGHT = NAV_HEIGHT;

function useInventoryGrid(
  totalItems: number,
  minItemSize: number,
  gap: number,
  minRows: number,
  maxRows: number,
  mode: 'inline' | 'dialog',
) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [cols, setCols] = useState(0);
  const [rows, setRows] = useState(0);
  const [gridHeight, setGridHeight] = useState(0);
  const ready = cols > 0 && rows > 0;

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    let rafId: number;
    const measure = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        // cols: 컨테이너 너비 기반
        const width = el.offsetWidth;
        // reInit 중 컨테이너가 일시적으로 축소될 수 있으므로 비정상 폭은 무시
        if (width < minItemSize * 2) return;
        const nextCols = Math.max(Math.floor((width + gap) / (minItemSize + gap)), 1);

        // rows: 뷰포트 높이에서 크롬 높이를 뺀 가용 영역 기반
        // 실제 아이템 높이를 측정하여 정확한 행 수 계산
        const firstItem = el.querySelector('[class*="grid"] > button');
        const measuredHeight = firstItem ? firstItem.getBoundingClientRect().height : 0;
        const itemHeight = measuredHeight > 0 ? measuredHeight : minItemSize;
        const rowHeight = itemHeight + gap;

        const vh = window.innerHeight;
        let availableHeight: number;
        if (mode === 'dialog') {
          availableHeight = vh * 0.9 - DIALOG_CHROME_HEIGHT;
        } else {
          // inline: 컨테이너 위치부터 뷰포트 하단까지 남은 공간 사용
          const rect = el.getBoundingClientRect();
          availableHeight = vh - rect.top - NAV_HEIGHT;
        }
        const nextRows =
          availableHeight > 0 ? Math.min(Math.max(Math.floor(availableHeight / rowHeight), minRows), maxRows) : minRows;

        // 그리드 명시적 높이 = 행 수 × 행 높이 - 마지막 gap
        const nextGridHeight = nextRows * rowHeight - gap;

        setCols((prev) => (prev === nextCols ? prev : nextCols));
        setRows((prev) => (prev === nextRows ? prev : nextRows));
        setGridHeight((prev) => (prev === nextGridHeight ? prev : nextGridHeight));
      });
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => {
      cancelAnimationFrame(rafId);
      observer.disconnect();
    };
  }, [gap, minItemSize, minRows, maxRows, mode]);

  const itemsPerPage = cols * rows;

  return { containerRef, cols, rows, itemsPerPage, gridHeight, ready };
}

interface InventoryGridProps {
  minRows?: number;
  maxRows?: number;
  minItemSize?: number;
  gap?: number;
  mode?: 'inline' | 'dialog';
}

function InventoryGrid({ minRows = 2, maxRows = 10, minItemSize = 64, gap = 4, mode = 'inline' }: InventoryGridProps) {
  const t = useTranslations('Mypage.Filter');
  const { filteredList, selectedIds, onSelectPersona, loadingPersona, isSpecialEffect } = useSelectPersonaListContext();

  const { containerRef, cols, rows, itemsPerPage, gridHeight, ready } = useInventoryGrid(
    filteredList.length,
    minItemSize,
    gap,
    minRows,
    maxRows,
    mode,
  );

  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    slidesToScroll: 1,
    containScroll: 'trimSnaps',
    skipSnaps: false,
    watchDrag: true,
  });

  const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(emblaApi);
  const { prevBtnDisabled, nextBtnDisabled, onPrevButtonClick, onNextButtonClick } = usePrevNextButtons(emblaApi);

  // Recompute embla when grid dimensions or content change
  useEffect(() => {
    if (ready && emblaApi) {
      emblaApi.reInit();
      emblaApi.scrollTo(0, true);
    }
  }, [emblaApi, ready, cols, rows, itemsPerPage, filteredList.length]);

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
    <div ref={containerRef} className="overflow-hidden">
      {!ready ? null : (
        <>
          {/* Navigation: arrows left, dots right */}
          <div className="flex mb-2 justify-between items-center">
            <div className="flex gap-[10px]">
              <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} className="w-6 h-6" />
              <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} className="w-6 h-6" />
            </div>
            <div className="flex gap-1">
              {(() => {
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

          {/* Embla carousel - each slide is a grid page */}
          <div className="overflow-hidden w-full [&>div]:!min-w-0" ref={emblaRef}>
            <div className="flex">
              {pages.map((page, pageIdx) => (
                <div key={pageIdx} className="flex-[0_0_100%] min-w-0 overflow-hidden">
                  <div
                    className="grid overflow-hidden"
                    style={{
                      gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
                      gridTemplateRows: `repeat(${rows}, minmax(0, 1fr))`,
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
        </>
      )}
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
      <div className={cn(listStyle, 'min-h-16')}>
        {Array.from({ length: 6 }).map((_, index) => (
          <Skeleton key={index} className="w-16 h-16 rounded-lg" />
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
