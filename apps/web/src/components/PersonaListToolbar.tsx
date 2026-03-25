'use client';

import { useTranslations } from 'next-intl';
import { css } from '_panda/css';
import { flex } from '_panda/patterns';
import { CombineChip, SearchBar } from '@gitanimals/ui-panda';
import { RotateCcwIcon } from 'lucide-react';

import { ANIMAL_TIER_INFO } from '@/components/AnimalCard/AnimalCard.constant';

import type { GradeFilter, PersonaFilterState, SortBy, TierFilter, VisibilityFilter } from '@/hooks/persona/usePersonaListFilter';

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
    <div className={toolbarContainerStyle}>
      {showSearch && (
        <SearchBar
          placeholder={t('search-placeholder')}
          value={filterState.searchQuery}
          onChange={(e) => onFilterChange({ searchQuery: e.target.value })}
        />
      )}

      <div className={filterRowStyle}>
        {/* 등급 필터 */}
        <CombineChip value={filterState.grade} onValueChange={(v: string) => onFilterChange({ grade: v as GradeFilter })}>
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
            className={toggleButtonStyle}
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
        <div className={countSectionStyle}>
          <span className={countTextStyle}>
            {counts.filtered}/{counts.total}
          </span>
          {isFiltering && (
            <button className={resetButtonStyle} onClick={onReset} aria-label={t('reset')}>
              <RotateCcwIcon size={14} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

const toolbarContainerStyle = css({
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
  marginBottom: '8px',
});

const filterRowStyle = flex({
  gap: '6px',
  alignItems: 'center',
  flexWrap: 'wrap',
});

const toggleButtonStyle = css({
  height: '30px',
  padding: '6px 12px',
  borderRadius: '6px',
  textStyle: 'glyph12.regular',
  color: 'white.white_50',
  backgroundColor: 'white.white_5',
  border: '1px solid transparent',
  cursor: 'pointer',
  transition: 'all 0.15s ease',
  _hover: {
    backgroundColor: 'white.white_10',
  },
  '&[data-active]': {
    color: 'white.white_90',
    backgroundColor: 'brand.sky_25',
    borderColor: 'brand.sky',
  },
});

const countSectionStyle = flex({
  alignItems: 'center',
  gap: '4px',
  marginLeft: 'auto',
});

const countTextStyle = css({
  textStyle: 'glyph12.regular',
  color: 'white.white_50',
});

const resetButtonStyle = css({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '24px',
  height: '24px',
  borderRadius: '4px',
  color: 'white.white_50',
  cursor: 'pointer',
  _hover: {
    backgroundColor: 'white.white_10',
    color: 'white.white_75',
  },
});
