import { useState } from 'react';
import { Select } from '@gitanimals/ui-tailwind';

type SortDirectionOptionType = 'DESC' | 'ASC';

const options = [
  { label: 'Descending', value: 'DESC' },
  { label: 'Ascending', value: 'ASC' },
];

export function SortDirectionSelect({ onSelect }: { onSelect: (sortDirection: SortDirectionOptionType) => void }) {
  return (
    <Select defaultValue={options[0].value} onValueChange={(value) => onSelect(value as SortDirectionOptionType)}>
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

export const useSortDirectionSelect = (initialValue: SortDirectionOptionType = 'DESC') => {
  const [sortDirection, setSortDirection] = useState<SortDirectionOptionType>(initialValue);

  return { sortDirection, setSortDirection };
};
