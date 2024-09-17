import type { UseQueryOptions } from '@tanstack/react-query';
import { useQuery, useSuspenseQuery } from '@tanstack/react-query';

import type { PetInfoSchema } from '@/schema/user';
import { getUniqueFilterList } from '@/utils/list';

import { renderGet } from '../render';

interface UseGetAllPetsResponse {
  id: string;
  name: string;
  personas: PetInfoSchema[];
}

export const getAllPets = async (username: string) => renderGet<UseGetAllPetsResponse>(`/users/${username}`);

export const getAllPetsQueryKey = (username?: string) => ['users', 'all-pet', { username }];

export const useGetAllPets = (username: string, options?: Omit<UseQueryOptions<UseGetAllPetsResponse>, 'queryKey'>) =>
  useQuery({
    queryKey: getAllPetsQueryKey(username),
    queryFn: () => getAllPets(username),
    ...options,
  });

export const useGetSuspenseAllPets = (username: string) => {
  return useSuspenseQuery({
    queryKey: getAllPetsQueryKey(username),
    queryFn: () => getAllPets(username),
  });
};

export const useGetUniqueTypeAllPets = (
  username: string,
  options?: Omit<UseQueryOptions<UseGetAllPetsResponse>, 'queryKey' | 'select'>,
) =>
  useGetAllPets(username, {
    ...options,
    select: (data) => {
      const personaList = data?.personas || [];
      const filteredPersonas = getUniqueFilterList(personaList, 'type');
      return {
        ...data,
        personas: filteredPersonas,
      };
    },
  });
