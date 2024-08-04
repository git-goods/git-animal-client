import type { GetAllPersonaResponse } from '@gitanimals/api';
import { getAllPersona } from '@gitanimals/api';
import { useSuspenseQuery } from '@tanstack/react-query';

export const useGetAllPersona = () =>
  useSuspenseQuery<GetAllPersonaResponse>({
    queryKey: ['persona', 'info', 'all'],
    queryFn: getAllPersona,
  });
