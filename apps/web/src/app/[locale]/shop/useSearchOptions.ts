'use client';

import { useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import type { OrderType, SortDirection } from '@gitanimals/api';

import { usePathname, useRouter } from '@/i18n/routing';

interface SearchOptions {
  personaType: string;
  orderType: OrderType;
  sortDirection: SortDirection;
}

export const useSearchOptions = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const personaType = searchParams.get('personaType') ?? '';
  const orderType: OrderType = (searchParams.get('orderType') ?? 'CREATED_AT') as OrderType;
  const sortDirection: SortDirection = (searchParams.get('sortDirection') ?? 'DESC') as SortDirection;

  const searchOptions = useMemo<SearchOptions>(
    () => ({
      personaType,
      orderType,
      sortDirection,
    }),
    [personaType, orderType, sortDirection],
  );

  const onSearchOptionChange = (key: keyof typeof searchOptions, value?: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(key, value ?? '');
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return { searchOptions, onSearchOptionChange };
};
