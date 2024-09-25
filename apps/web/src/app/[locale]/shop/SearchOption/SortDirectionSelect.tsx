import SearchOptionSelect from './SearchOptionSelect';

function SortDirectionSelect({ onSelect }: { onSelect: (sortDirection: string) => void }) {
  return (
    <SearchOptionSelect
      onSelect={onSelect}
      options={[
        { label: 'Descending', value: 'DESC' },
        { label: 'Ascending', value: 'ASC' },
      ]}
    />
  );
}

export default SortDirectionSelect;
