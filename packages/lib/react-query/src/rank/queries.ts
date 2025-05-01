import {
  getRankHistories,
  GetRankHistoriesRequest,
  getRanks,
  GetRanksRequest,
  getTotalRank,
  GetTotalRankRequest,
} from '@gitanimals/api';
import { queryOptions } from '@tanstack/react-query';

export const rankQueries = {
  allKey: () => ['rank'],
  getRanksOptions: (request: GetRanksRequest) => ({
    queryKey: [...rankQueries.allKey(), request],
    queryFn: () => getRanks(request),
  }),

  getRankHistoriesOptions: (request: GetRankHistoriesRequest) => ({
    queryKey: [...rankQueries.allKey(), request],
    queryFn: () => getRankHistories(request),
  }),

  getTotalRankOptions: (request: GetTotalRankRequest) => ({
    queryKey: [...rankQueries.allKey(), request],
    queryFn: () => getTotalRank(request),
  }),
};
