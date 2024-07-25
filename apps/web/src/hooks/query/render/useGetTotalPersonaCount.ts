import type { GetTotalPersonaCountResponse } from '@gitanimals/api';
import { getTotalPersonaCount } from '@gitanimals/api';
import type { UseQueryOptions } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';

export const useGetTotalPersonaCount = (options?: UseQueryOptions<GetTotalPersonaCountResponse>) =>
  useQuery<GetTotalPersonaCountResponse>({
    queryKey: ['persona', 'users', 'statistics', 'total'],
    queryFn: getTotalPersonaCount,
    ...options,
  });
