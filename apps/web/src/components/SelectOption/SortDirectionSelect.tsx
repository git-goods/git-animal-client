import { SelectOption } from '@/components/SelectOption';

export function SortDirectionSelect({ onSelect }: { onSelect: (sortDirection: string) => void }) {
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
