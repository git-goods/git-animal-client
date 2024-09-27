import type { GetAllMyPersonasResponse } from '@gitanimals/api';
import type { UseQueryOptions } from '@tanstack/react-query';
import { queryOptions, useQuery, useSuspenseQuery } from '@tanstack/react-query';

import type { PetInfoSchema } from '@/schema/user';
import { getUniqueFilterList } from '@/utils/list';

import { renderGet } from '../render';

import { USER_QUERY_KEY } from './useGetUser';

interface UseGetAllPetsResponse {
  id: string;
  name: string;
  personas: PetInfoSchema[];
}

export const getAllPets = async (username: string) => renderGet<GetAllMyPersonasResponse>(`/users/${username}`);

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

export const ALL_PETS_QUERY_KEY = [USER_QUERY_KEY, 'all-pet'];

export const getAllPetsQueryOptions = (username: string) =>
  queryOptions({
    queryKey: ALL_PETS_QUERY_KEY,
    queryFn: () => getAllPets(username),
  });
