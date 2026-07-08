import {
  getAllPersona,
  GetAllPersonaResponse,
  getTotalPersonaCount,
  GetTotalPersonaCountResponse,
  getTotalRenderUserCount,
  GetTotalRenderUserCountResponse,
} from '@gitanimals/api/src/render';
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
  backgroundKey: (username: string) => ['render', 'user', 'background', username],
  getMyBackground: (username: string) =>
    queryOptions({
      queryKey: renderUserQueries.backgroundKey(username),
      queryFn: () => getMyBackground(username),
    }),
};

// Persona info + landing statistics. Keys are literal (not derived) to stay
// byte-identical to their prior app-local definitions.
export const renderStatsQueries = {
  allPersonaKey: () => ['persona', 'info', 'all'],
  allPersonaOptions: () =>
    queryOptions<GetAllPersonaResponse>({
      queryKey: renderStatsQueries.allPersonaKey(),
      queryFn: () => getAllPersona(),
    }),

  totalPersonaCountKey: () => ['persona', 'users', 'statistics', 'total'],
  totalPersonaCountOptions: () =>
    queryOptions<GetTotalPersonaCountResponse>({
      queryKey: renderStatsQueries.totalPersonaCountKey(),
      queryFn: getTotalPersonaCount,
    }),

  totalRenderUserCountKey: () => ['render', 'users', 'statistics', 'total'],
  totalRenderUserCountOptions: () =>
    queryOptions<GetTotalRenderUserCountResponse>({
      queryKey: renderStatsQueries.totalRenderUserCountKey(),
      queryFn: getTotalRenderUserCount,
    }),
};
