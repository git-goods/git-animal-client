'use client';

import { useSearchParams } from 'next/navigation';
import type { FilterType } from '@gitanimals/api';
import { Select } from '@gitanimals/ui-tailwind';

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
    <Select defaultValue={filter} onValueChange={(value) => onSelect(value as FilterType)}>
      <Select.Trigger>
        <Select.Value />
      </Select.Trigger>
      <Select.Content>
        {options.map((option) => (
          <Select.Item key={option.value} value={option.value}>
            {option.label}
          </Select.Item>
        ))}
      </Select.Content>
    </Select>
  );
}
