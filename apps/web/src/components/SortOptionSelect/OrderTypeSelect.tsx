import { useState } from 'react';

import { SelectOption } from '@/components/SortOptionSelect';

export type OrderOptionType = 'CREATED_AT' | 'PRICE' | 'LEVEL';

export function OrderTypeSelect({ onSelect }: { onSelect: (orderType: OrderOptionType) => void }) {
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

export const useOrderTypeSelect = (initialValue: OrderOptionType = 'LEVEL') => {
  const [orderType, setOrderType] = useState<OrderOptionType>(initialValue);

  return { orderType, setOrderType };
};
