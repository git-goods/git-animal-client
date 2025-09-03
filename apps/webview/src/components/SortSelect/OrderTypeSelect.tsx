import { useState } from 'react';
import { Select } from '@gitanimals/ui-panda';

type OrderOptionType = 'CREATED_AT' | 'PRICE' | 'LEVEL';

const options = [
  { label: 'Date', value: 'CREATED_AT' },
  { label: 'Price', value: 'PRICE' },
  { label: 'Level', value: 'LEVEL' },
];

export function OrderTypeSelect({ onSelect }: { onSelect: (orderType: OrderOptionType) => void }) {
  return (
    <Select defaultValue={options[0].value} onValueChange={(value) => onSelect(value as OrderOptionType)}>
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

export const useOrderTypeSelect = (initialValue: OrderOptionType = 'LEVEL') => {
  const [orderType, setOrderType] = useState<OrderOptionType>(initialValue);

  return { orderType, setOrderType };
};
