import SearchOptionSelect from './SearchOptionSelect';

function OrderTypeSelect({ onSelect }: { onSelect: (orderType: string) => void }) {
  return (
    <SearchOptionSelect
      onSelect={onSelect}
      size={128}
      options={[
        { label: 'Price', value: 'PRICE' },
        { label: 'Date', value: 'CREATED_AT' },
        { label: 'Level', value: 'LEVEL' },
      ]}
    />
  );
}

export default OrderTypeSelect;
