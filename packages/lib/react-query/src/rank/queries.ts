import { getRanks, GetRanksRequest, GetRanksResponse, getTotalRank, GetTotalRankRequest } from '@gitanimals/api';
import { QueryKey, queryOptions, UndefinedInitialDataOptions } from '@tanstack/react-query';

interface QueryProps<
  TQueryFnData = unknown,
  TError = unknown,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
> extends UndefinedInitialDataOptions<TQueryFnData, TError, TData, TQueryKey> {
  queryFn: () => Promise<TQueryFnData>;
}

export const rankQueries = {
  allKey: () => ['rank'],
  getRanksOptions: (request: GetRanksRequest) => ({
    queryKey: [...rankQueries.allKey(), request],
    queryFn: () => getRanks(request),
  }),
  getTotalRankOptions: (request: GetTotalRankRequest) => ({
    queryKey: [...rankQueries.allKey(), request],
    queryFn: () => getTotalRank(request),
  }),
};
