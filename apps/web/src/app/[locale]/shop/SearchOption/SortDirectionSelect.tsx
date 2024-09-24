import SearchOptionSelect from './SearchOptionSelect';

function SortDirectionSelect({ onSelect }: { onSelect: (sortDirection: string) => void }) {
  return (
    <SearchOptionSelect
      onSelect={onSelect}
      options={[
        { label: 'Ascending', value: 'ASC' },
        { label: 'Descending', value: 'DESC' },
      ]}
    />
  );
}

export default SortDirectionSelect;
