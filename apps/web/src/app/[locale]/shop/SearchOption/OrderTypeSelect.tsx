import SearchOptionSelect from './SearchOptionSelect';

function OrderTypeSelect({ onSelect }: { onSelect: (orderType: string) => void }) {
  return (
    <SearchOptionSelect
      onSelect={onSelect}
      options={[
        { label: 'Date', value: 'CREATED_AT' },
        { label: 'Price', value: 'PRICE' },
        { label: 'Level', value: 'LEVEL' },
      ]}
    />
  );
}

export default OrderTypeSelect;
