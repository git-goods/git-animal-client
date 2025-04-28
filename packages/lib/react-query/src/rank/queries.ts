import { getRankHistories, GetRankHistoriesRequest, getRanks, GetRanksRequest } from '@gitanimals/api';
import { queryOptions } from '@tanstack/react-query';

export const rankQueries = {
  allKey: () => ['rank'],
  getRanksOptions: (request: GetRanksRequest) =>
    queryOptions({
      queryKey: [...rankQueries.allKey(), request],
      queryFn: () => getRanks(request),
    }),

  getRankHistoriesOptions: (request: GetRankHistoriesRequest) =>
    queryOptions({
      queryKey: [...rankQueries.allKey(), request],
      queryFn: () => getRankHistories(request),
    }),
};
