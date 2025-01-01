'use client';

import { useSearchParams } from 'next/navigation';
import { getNewUrl } from '@gitanimals/util-common';

import { usePathname } from '@/i18n/routing';

export const useGetNextUrl = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const getNextUrl = (newParams: Record<string, unknown>) => {
    const currentParams = Object.fromEntries(searchParams.entries());
    return getNewUrl({ baseUrl: pathname, newParams, oldParams: currentParams });
  };

  return getNextUrl;
};
