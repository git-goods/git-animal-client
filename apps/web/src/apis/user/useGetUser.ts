import { getUser, type UserResponse } from '@gitanimals/api';
import type { UseSuspenseQueryOptions } from '@tanstack/react-query';
import { useSuspenseQuery } from '@tanstack/react-query';

export const USER_QUERY_KEY = 'user';

export const useGetSuspenseUser = (options?: UseSuspenseQueryOptions<UserResponse>) =>
  useSuspenseQuery<UserResponse>({
    queryKey: [USER_QUERY_KEY],
    queryFn: getUser,
    ...options,
  });
