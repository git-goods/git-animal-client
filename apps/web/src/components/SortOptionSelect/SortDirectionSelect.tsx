import { useState } from 'react';

import { SelectOption } from '@/components/SortOptionSelect';

export type SortDirectionOptionType = 'DESC' | 'ASC';

export function SortDirectionSelect({ onSelect }: { onSelect: (sortDirection: SortDirectionOptionType) => void }) {
  return (
    <SelectOption
      onSelect={onSelect}
      options={[
        { label: 'Descending', value: 'DESC' },
        { label: 'Ascending', value: 'ASC' },
      ]}
    />
  );
}

export const useSortDirectionSelect = (initialValue: SortDirectionOptionType = 'DESC') => {
  const [sortDirection, setSortDirection] = useState<SortDirectionOptionType>(initialValue);

  return { sortDirection, setSortDirection };
};
