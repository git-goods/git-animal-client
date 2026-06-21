'use client';

import { useTranslations } from 'next-intl';
import { CombineChip, SearchBar } from '@gitanimals/ui-tailwind';
import { RotateCcwIcon } from 'lucide-react';

import { ANIMAL_TIER_INFO } from '@/components/AnimalCard/AnimalCard.constant';
import type {
  GradeFilter,
  PersonaFilterState,
  SortBy,
  TierFilter,
  VisibilityFilter,
} from '@/hooks/persona/usePersonaListFilter';

export interface PersonaListToolbarProps {
  filterState: PersonaFilterState;
  onFilterChange: (partial: Partial<PersonaFilterState>) => void;
  onReset: () => void;
  counts: { filtered: number; total: number };
  isFiltering: boolean;
  /** 검색바 표시 여부 */
  showSearch?: boolean;
  /** 가시성 필터 표시 여부 (Farm 컨텍스트) */
  showVisibilityFilter?: boolean;
  /** 진화 가능 필터 표시 여부 */
  showEvolvableFilter?: boolean;
}

const GRADE_OPTIONS: { value: GradeFilter; labelKey: string }[] = [
  { value: 'ALL', labelKey: 'filter-all' },
  { value: 'COLLABORATOR', labelKey: 'filter-grade-collaborator' },
  { value: 'DEFAULT', labelKey: 'filter-grade-default' },
  { value: 'EVOLUTION', labelKey: 'filter-grade-evolution' },
];

const TIER_OPTIONS: { value: TierFilter; label: string }[] = [
  { value: 'ALL', label: 'ALL' },
  { value: 'EX', label: ANIMAL_TIER_INFO.EX.label },
  { value: 'S_PLUS', label: ANIMAL_TIER_INFO.S_PLUS.label },
  { value: 'A_PLUS', label: ANIMAL_TIER_INFO.A_PLUS.label },
  { value: 'B_MINUS', label: ANIMAL_TIER_INFO.B_MINUS.label },
];

const VISIBILITY_OPTIONS: { value: VisibilityFilter; labelKey: string }[] = [
  { value: 'ALL', labelKey: 'filter-all' },
  { value: 'VISIBLE', labelKey: 'filter-visible' },
  { value: 'HIDDEN', labelKey: 'filter-hidden' },
];

const SORT_OPTIONS: { value: SortBy; labelKey: string }[] = [
  { value: 'grade', labelKey: 'sort-grade' },
  { value: 'level-desc', labelKey: 'sort-level-desc' },
  { value: 'level-asc', labelKey: 'sort-level-asc' },
  { value: 'tier', labelKey: 'sort-tier' },
  { value: 'name', labelKey: 'sort-name' },
];

export function PersonaListToolbar({
  filterState,
  onFilterChange,
  onReset,
  counts,
  isFiltering,
  showSearch = false,
  showVisibilityFilter = false,
  showEvolvableFilter = false,
}: PersonaListToolbarProps) {
  const t = useTranslations('Mypage.Filter');

  return (
    <div className="mb-[8px] flex flex-col gap-[8px]">
      {showSearch && (
        <SearchBar
          placeholder={t('search-placeholder')}
          value={filterState.searchQuery}
          onChange={(e) => onFilterChange({ searchQuery: e.target.value })}
        />
      )}

      <div className="flex flex-wrap items-center gap-[6px]">
        {/* 등급 필터 */}
        <CombineChip
          value={filterState.grade}
          onValueChange={(v: string) => onFilterChange({ grade: v as GradeFilter })}
        >
          <CombineChip.Trigger size="small">
            <CombineChip.Value placeholder={t('grade')} />
          </CombineChip.Trigger>
          <CombineChip.Content>
            {GRADE_OPTIONS.map((opt) => (
              <CombineChip.Item key={opt.value} value={opt.value}>
                {t(opt.labelKey)}
              </CombineChip.Item>
            ))}
          </CombineChip.Content>
        </CombineChip>

        {/* 티어 필터 */}
        <CombineChip value={filterState.tier} onValueChange={(v: string) => onFilterChange({ tier: v as TierFilter })}>
          <CombineChip.Trigger size="small">
            <CombineChip.Value placeholder={t('tier')} />
          </CombineChip.Trigger>
          <CombineChip.Content>
            {TIER_OPTIONS.map((opt) => (
              <CombineChip.Item key={opt.value} value={opt.value}>
                {opt.label}
              </CombineChip.Item>
            ))}
          </CombineChip.Content>
        </CombineChip>

        {/* 가시성 필터 */}
        {showVisibilityFilter && (
          <CombineChip
            value={filterState.visibility}
            onValueChange={(v: string) => onFilterChange({ visibility: v as VisibilityFilter })}
          >
            <CombineChip.Trigger size="small">
              <CombineChip.Value placeholder={t('visibility')} />
            </CombineChip.Trigger>
            <CombineChip.Content>
              {VISIBILITY_OPTIONS.map((opt) => (
                <CombineChip.Item key={opt.value} value={opt.value}>
                  {t(opt.labelKey)}
                </CombineChip.Item>
              ))}
            </CombineChip.Content>
          </CombineChip>
        )}

        {/* 진화 가능 필터 */}
        {showEvolvableFilter && (
          <button
            className="glyph12-regular h-[30px] cursor-pointer rounded-[6px] border border-solid border-transparent bg-white-5 px-[12px] py-[6px] text-white-50 transition-all duration-150 ease-[ease] hover:bg-white-10 data-[active]:border-brand-sky data-[active]:bg-brand-sky_25 data-[active]:text-white-90"
            data-active={filterState.evolvableOnly || undefined}
            onClick={() => onFilterChange({ evolvableOnly: !filterState.evolvableOnly })}
          >
            {t('evolvable-only')}
          </button>
        )}

        {/* 정렬 */}
        <CombineChip value={filterState.sortBy} onValueChange={(v: string) => onFilterChange({ sortBy: v as SortBy })}>
          <CombineChip.Trigger size="small">
            <CombineChip.Value placeholder={t('sort')} />
          </CombineChip.Trigger>
          <CombineChip.Content>
            {SORT_OPTIONS.map((opt) => (
              <CombineChip.Item key={opt.value} value={opt.value}>
                {t(opt.labelKey)}
              </CombineChip.Item>
            ))}
          </CombineChip.Content>
        </CombineChip>

        {/* 결과 수 + 초기화 */}
        <div className="ml-auto flex items-center gap-[4px]">
          <span className="glyph12-regular text-white-50">
            {counts.filtered}/{counts.total}
          </span>
          {isFiltering && (
            <button
              className="flex h-[24px] w-[24px] cursor-pointer items-center justify-center rounded-[4px] text-white-50 hover:bg-white-10 hover:text-white-75"
              onClick={onReset}
              aria-label={t('reset')}
            >
              <RotateCcwIcon size={14} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
