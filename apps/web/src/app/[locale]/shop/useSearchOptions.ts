import { useState } from 'react';
import type { OrderType, SortDirection } from '@gitanimals/api';

export const useSearchOptions = () => {
  const [searchOptions, setSearchOptions] = useState<{
    personaType: string;
    orderType: OrderType;
    sortDirection: SortDirection;
  }>({
    personaType: '',
    orderType: 'PRICE',
    sortDirection: 'ASC',
  });

  const onSearchOptionChange = (key: keyof typeof searchOptions, value?: string) => {
    setSearchOptions((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return { searchOptions, onSearchOptionChange };
};
