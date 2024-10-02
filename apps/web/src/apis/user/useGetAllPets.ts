import { getAllMyPersonas } from '@gitanimals/api';
import { queryOptions } from '@tanstack/react-query';

import { USER_QUERY_KEY } from './useGetUser';

export const ALL_PETS_QUERY_KEY = [USER_QUERY_KEY, 'all-pet'];

export const getAllPetsQueryOptions = (username: string) =>
  queryOptions({
    queryKey: ALL_PETS_QUERY_KEY,
    queryFn: () => getAllMyPersonas(username),
  });
