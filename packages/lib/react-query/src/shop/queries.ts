import { getBackground } from '@gitanimals/api';
import { queryOptions } from '@tanstack/react-query';

export const shopQueries = {
  allKey: () => ['shop'],
  backgroundKey: () => [...shopQueries.allKey(), 'background'],
  backgroundOptions: () =>
    queryOptions({
      queryKey: shopQueries.backgroundKey(),
      queryFn: getBackground,
    }),
};
