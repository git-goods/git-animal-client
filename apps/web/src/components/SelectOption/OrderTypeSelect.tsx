import { SelectOption } from '@/components/SelectOption';

export function OrderTypeSelect({ onSelect }: { onSelect: (orderType: string) => void }) {
  return (
    <SelectOption
      onSelect={onSelect}
      options={[
        { label: 'Date', value: 'CREATED_AT' },
        { label: 'Price', value: 'PRICE' },
        { label: 'Level', value: 'LEVEL' },
      ]}
    />
  );
}
