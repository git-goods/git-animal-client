import { isPressStar } from '@gitanimals/api';
import { queryOptions } from '@tanstack/react-query';

type IsPressStarRequest = Parameters<typeof isPressStar>[0];

export const renderQueries = {
  isPressStarQueryKey: (request: IsPressStarRequest) => ['isPressStar', request],
  isPressStar: (request: IsPressStarRequest) =>
    queryOptions({
      queryKey: renderQueries.isPressStarQueryKey(request),
      queryFn: () => isPressStar(request),
    }),
};
