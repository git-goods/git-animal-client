import { getUser, getAllMyPersonas } from '@gitanimals/api';
import { queryOptions } from '@tanstack/react-query';

export const userQueries = {
  allKey: () => ['user'],
  allPersonasKey: () => [...userQueries.allKey(), 'all-persona'],
  userOptions: () =>
    queryOptions({
      queryKey: userQueries.allKey(),
      queryFn: getUser,
    }),
  allPersonasOptions: (username: string) =>
    queryOptions({
      queryKey: [...userQueries.allPersonasKey(), username],
      queryFn: () => getAllMyPersonas(username),
    }),
};
