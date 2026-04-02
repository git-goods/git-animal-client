'use client';

import { useTranslations } from 'next-intl';
import { cn, SearchBar, Select } from '@gitanimals/ui-tailwind';
import { RotateCcwIcon } from 'lucide-react';

import { ANIMAL_TIER_INFO } from '@/shared/config/animalTier';
import type {
  GradeFilter,
  PersonaFilterState,
  SortBy,
  TierFilter,
  VisibilityFilter,
} from '@/entities/persona/model/usePersonaListFilter';

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

const filterTriggerClassName = cn(
  'min-w-0 max-w-[9.5rem] shrink-0',
  'font-product text-glyph-12 text-white/50',
  'border-white/10',
);

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
    <div className="mb-2 flex flex-col gap-2">
      {showSearch && (
        <SearchBar
          placeholder={t('search-placeholder')}
          value={filterState.searchQuery}
          onChange={(e) => onFilterChange({ searchQuery: e.target.value })}
        />
      )}

      <div className="flex flex-wrap items-center gap-1.5">
        <Select value={filterState.grade} onValueChange={(v) => onFilterChange({ grade: v as GradeFilter })}>
          <Select.Trigger size="sm" className={filterTriggerClassName}>
            <Select.Value placeholder={t('grade')} />
          </Select.Trigger>
          <Select.Content>
            {GRADE_OPTIONS.map((opt) => (
              <Select.Item key={opt.value} value={opt.value}>
                {t(opt.labelKey)}
              </Select.Item>
            ))}
          </Select.Content>
        </Select>

        <Select value={filterState.tier} onValueChange={(v) => onFilterChange({ tier: v as TierFilter })}>
          <Select.Trigger size="sm" className={filterTriggerClassName}>
            <Select.Value placeholder={t('tier')} />
          </Select.Trigger>
          <Select.Content>
            {TIER_OPTIONS.map((opt) => (
              <Select.Item key={opt.value} value={opt.value}>
                {opt.label}
              </Select.Item>
            ))}
          </Select.Content>
        </Select>

        {showVisibilityFilter && (
          <Select
            value={filterState.visibility}
            onValueChange={(v) => onFilterChange({ visibility: v as VisibilityFilter })}
          >
            <Select.Trigger size="sm" className={filterTriggerClassName}>
              <Select.Value placeholder={t('visibility')} />
            </Select.Trigger>
            <Select.Content>
              {VISIBILITY_OPTIONS.map((opt) => (
                <Select.Item key={opt.value} value={opt.value}>
                  {t(opt.labelKey)}
                </Select.Item>
              ))}
            </Select.Content>
          </Select>
        )}

        {showEvolvableFilter && (
          <button
            type="button"
            className={cn(
              'h-[30px] shrink-0 cursor-pointer rounded-md border border-transparent px-3 font-product text-glyph-12 text-white/50 transition-colors',
              'bg-white/5 hover:bg-white/10',
              filterState.evolvableOnly && 'border-brand-sky bg-brand-sky/25 text-white/90',
            )}
            data-active={filterState.evolvableOnly || undefined}
            onClick={() => onFilterChange({ evolvableOnly: !filterState.evolvableOnly })}
          >
            {t('evolvable-only')}
          </button>
        )}

        <Select value={filterState.sortBy} onValueChange={(v) => onFilterChange({ sortBy: v as SortBy })}>
          <Select.Trigger size="sm" className={filterTriggerClassName}>
            <Select.Value placeholder={t('sort')} />
          </Select.Trigger>
          <Select.Content>
            {SORT_OPTIONS.map((opt) => (
              <Select.Item key={opt.value} value={opt.value}>
                {t(opt.labelKey)}
              </Select.Item>
            ))}
          </Select.Content>
        </Select>

        <div className="ml-auto flex items-center gap-1">
          <span className="font-product text-glyph-12 text-white/50">
            {counts.filtered}/{counts.total}
          </span>
          {isFiltering && (
            <button
              type="button"
              className="flex size-6 cursor-pointer items-center justify-center rounded text-white/50 hover:bg-white/10 hover:text-white/75"
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
