import type { GetTotalPersonaCountResponse } from '@gitanimals/api';
import { getTotalPersonaCount } from '@gitanimals/api';
import type { UseSuspenseQueryOptions } from '@tanstack/react-query';
import { useSuspenseQuery } from '@tanstack/react-query';

export const useGetTotalPersonaCount = (options?: UseSuspenseQueryOptions<GetTotalPersonaCountResponse>) =>
  useSuspenseQuery<GetTotalPersonaCountResponse>({
    queryKey: ['persona', 'users', 'statistics', 'total'],
    queryFn: getTotalPersonaCount,
    ...options,
  });
