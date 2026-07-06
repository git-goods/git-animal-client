import type {
  GetAllPersonaResponse,
  GetTotalPersonaCountResponse,
  GetTotalRenderUserCountResponse,
} from '@gitanimals/api';
import { getAllPersona, getTotalPersonaCount, getTotalRenderUserCount } from '@gitanimals/api';
import { queryOptions } from '@tanstack/react-query';

const getAllPersonaOptions = () =>
  queryOptions<GetAllPersonaResponse>({
    queryKey: ['persona', 'info', 'all'],
    queryFn: () => getAllPersona(),
  });

const getTotalPersonaCountOptions = () =>
  queryOptions<GetTotalPersonaCountResponse>({
    queryKey: ['persona', 'users', 'statistics', 'total'],
    queryFn: getTotalPersonaCount,
  });

const getTotalRenderUserCountOptions = () =>
  queryOptions<GetTotalRenderUserCountResponse>({
    queryKey: ['render', 'users', 'statistics', 'total'],
    queryFn: getTotalRenderUserCount,
  });

export const renderQueryOptions = {
  getAllPersona: getAllPersonaOptions,
  getTotalPersonaCount: getTotalPersonaCountOptions,
  getTotalRenderUserCount: getTotalRenderUserCountOptions,
};
