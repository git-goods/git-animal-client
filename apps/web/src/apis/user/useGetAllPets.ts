import type { GetAllMyPersonasResponse } from '@gitanimals/api';
import { queryOptions } from '@tanstack/react-query';

import { renderGet } from '../render';

import { USER_QUERY_KEY } from './useGetUser';

const getAllPets = async (username: string) => renderGet<GetAllMyPersonasResponse>(`/users/${username}`);

export const ALL_PETS_QUERY_KEY = [USER_QUERY_KEY, 'all-pet'];

export const getAllPetsQueryOptions = (username: string) =>
  queryOptions({
    queryKey: ALL_PETS_QUERY_KEY,
    queryFn: () => getAllPets(username),
  });
