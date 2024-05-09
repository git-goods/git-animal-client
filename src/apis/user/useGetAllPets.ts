import type { UseQueryOptions } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';

import { renderGet } from '../render';

interface UseGetAllPetsResponse {
  id: string;
  name: string;
  personas: {
    id: string;
    type: string;
    level: string;
  }[];
}

export const getAllPets = async (username: string) => renderGet<UseGetAllPetsResponse>(`/users/${username}`);

export const useGetAllPets = (username: string, options?: Omit<UseQueryOptions<UseGetAllPetsResponse>, 'queryKey'>) =>
  useQuery({
    queryKey: ['users', 'all-pet', { username }],
    queryFn: () => getAllPets(username),
    ...options,
  });
