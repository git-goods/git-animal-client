import { getAllMyPersonas } from '@gitanimals/api';
import { queryOptions } from '@tanstack/react-query';

export const userQueryKeys = {
  all: () => ['user'],
  allPersonas: () => [...userQueryKeys.all(), 'all-persona'],
};

export const userAllPersonasQueryOptions = (username: string) =>
  queryOptions({
    queryKey: userQueryKeys.allPersonas(),
    queryFn: () => getAllMyPersonas(username),
  });
