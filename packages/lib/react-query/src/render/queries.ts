import { getMyBackground, isPressStar } from '@gitanimals/api';
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

export const renderUserQueries = {
  allKey: ['render', 'user'],
  getMyBackground: (username: string) =>
    queryOptions({
      queryKey: [renderUserQueries.allKey, 'getMyBackground', username],
      queryFn: () => getMyBackground(username),
    }),
};
