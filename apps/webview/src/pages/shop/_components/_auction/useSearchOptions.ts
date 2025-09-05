'use client';

import { useMemo } from 'react';
import type { OrderType, SortDirection } from '@gitanimals/api';

import { parseAsStringLiteral, useQueryState } from 'nuqs';

interface SearchOptions {
  personaType: string | null;
  orderType: OrderType;
  sortDirection: SortDirection;
}

export const useSearchOptions = () => {
  const [personaType, setPersonaType] = useQueryState('personaType');
  const [orderType, setOrderType] = useQueryState(
    'orderType',
    parseAsStringLiteral(['CREATED_AT', 'PRICE', 'LEVEL']).withDefault('CREATED_AT'),
  );
  const [sortDirection, setSortDirection] = useQueryState(
    'sortDirection',
    parseAsStringLiteral(['ASC', 'DESC']).withDefault('DESC'),
  );

  const searchOptions = useMemo<SearchOptions>(
    () => ({
      personaType,
      orderType,
      sortDirection,
    }),
    [personaType, orderType, sortDirection],
  );

  const onSearchOptionChange = (key: keyof typeof searchOptions, value?: string) => {
    if (key === 'personaType') {
      setPersonaType(value as OrderType);
    } else if (key === 'orderType') {
      setOrderType(value as OrderType);
    } else if (key === 'sortDirection') {
      setSortDirection(value as SortDirection);
    }
  };

  return { searchOptions, onSearchOptionChange };
};
