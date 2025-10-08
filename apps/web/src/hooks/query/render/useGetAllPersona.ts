import type { GetAllPersonaResponse } from '@gitanimals/api';
import { getAllPersona } from '@gitanimals/api';
import type { UseQueryOptions } from '@tanstack/react-query';
import { useSuspenseQuery } from '@tanstack/react-query';

export const useGetAllPersona = (options?: Omit<UseQueryOptions<GetAllPersonaResponse>, 'queryKey' | 'queryFn'>) =>
  useSuspenseQuery<GetAllPersonaResponse>({
    queryKey: ['persona', 'info', 'all'],
    queryFn: () => getAllPersona(),
    ...options,
  });
