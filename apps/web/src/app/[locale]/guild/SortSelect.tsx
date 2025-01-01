'use client';

import { useSearchParams } from 'next/navigation';
import type { FilterType } from '@gitanimals/api';
import { CombineChip } from '@gitanimals/ui-panda';

import { useGetNextUrl } from '@/hooks/useGetNewUrl';
import { useRouter } from '@/i18n/routing';

const options: { label: string; value: FilterType }[] = [
  { label: 'Random', value: 'RANDOM' },
  { label: 'People (asc)', value: 'PEOPLE_ASC' },
  { label: 'People (desc)', value: 'PEOPLE_DESC' },
  { label: 'Contribution (asc)', value: 'CONTRIBUTION_ASC' },
  { label: 'Contribution (desc)', value: 'CONTRIBUTION_DESC' },
];

export function SortSelect() {
  const router = useRouter();
  const getNextUrl = useGetNextUrl();
  const searchParams = useSearchParams();
  const filter = (searchParams.get('filter') as FilterType) ?? 'RANDOM';

  const onSelect = (value: FilterType) => {
    const nextUrl = getNextUrl({ filter: value });
    router.replace(nextUrl);
  };

  return (
    <CombineChip defaultValue={filter} onValueChange={(value) => onSelect(value as FilterType)}>
      <CombineChip.Trigger>
        <CombineChip.Value />
      </CombineChip.Trigger>
      <CombineChip.Content>
        {options.map((option) => (
          <CombineChip.Item key={option.value} value={option.value}>
            {option.label}
          </CombineChip.Item>
        ))}
      </CombineChip.Content>
    </CombineChip>
  );
}
