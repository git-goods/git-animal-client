import { getUser, getAllMyPersonas } from '@gitanimals/api';
import { queryOptions } from '@tanstack/react-query';

export const userQueries = {
  allKey: () => ['user'],
  userKey: () => userQueries.allKey(),
  userOptions: () =>
    queryOptions({
      queryKey: userQueries.userKey(),
      queryFn: getUser,
    }),
  allPersonasKey: () => [...userQueries.allKey(), 'all-persona'],
  allPersonasOptions: (username: string) =>
    queryOptions({
      queryKey: userQueries.allPersonasKey(),
      queryFn: () => getAllMyPersonas(username),
    }),
};
