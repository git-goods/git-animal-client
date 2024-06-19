import type { UseQueryOptions, UseSuspenseQueryOptions } from '@tanstack/react-query';
import { useQuery, useSuspenseQuery } from '@tanstack/react-query';

import type { UserSchema } from '@/schema/user';

import { get } from '..';

export const getUserByToken = async (token: string): Promise<UserSchema> =>
  get('/users', {
    headers: {
      Authorization: token,
    },
  });

export const USER_QUERY_KEY = 'user';

export const useGetUser = (option?: UseQueryOptions<UserSchema>) =>
  useQuery<UserSchema>({
    queryKey: [USER_QUERY_KEY],
    queryFn: () => get('/users'),
    ...option,
  });

export const useGetSuspenseUser = (options?: UseSuspenseQueryOptions<UserSchema>) =>
  useSuspenseQuery<UserSchema>({ queryKey: [USER_QUERY_KEY], queryFn: () => get('/users'), ...options });
