import { getRanks, GetRanksRequest } from '@gitanimals/api';
import { queryOptions } from '@tanstack/react-query';

export const rankQueries = {
  allKey: () => ['rank'],
  getRanksOptions: (request: GetRanksRequest) =>
    queryOptions({
      queryKey: rankQueries.allKey(),
      queryFn: () => getRanks(request),
    }),
};
