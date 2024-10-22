import { getAllMyPersonas, getUser } from '@gitanimals/api';
import { queryOptions } from '@tanstack/react-query';

export const userQueryKeys = {
  all: () => ['user'],
  allPersonas: (username: string) => [...userQueryKeys.all(), 'all-persona', username],
};

export const useUserQueryOptions = queryOptions({
  queryKey: userQueryKeys.all(),
  queryFn: getUser,
});

export const userAllPersonasQueryOptions = (username: string) =>
  queryOptions({
    queryKey: userQueryKeys.allPersonas(username),
    queryFn: () => getAllMyPersonas(username),
  });
