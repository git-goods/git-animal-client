import type { GetProductHistoriesRequest, GetProductHistoriesResponse } from '@gitanimals/api';
import { getHistory } from '@gitanimals/api';
import type { UseQueryOptions } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';

export const getHistoryQueryKey = (request?: GetProductHistoriesRequest) => ['history', request];

export const useGetHistory = (
  request?: GetProductHistoriesRequest,
  option?: Omit<UseQueryOptions<GetProductHistoriesResponse>, 'queryKey'>,
) => {
  return useQuery({
    queryKey: getHistoryQueryKey(request),
    queryFn: () => getHistory(request),
    ...option,
  });
};
