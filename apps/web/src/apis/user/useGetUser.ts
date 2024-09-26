// export const getUserByToken = async (token: string): Promise<UserSchema> =>
//   get('/users', {
//     headers: {
//       Authorization: token,
//     },
//   });
import { getUser, type UserResponse } from '@gitanimals/api';
import type { UseQueryOptions, UseSuspenseQueryOptions } from '@tanstack/react-query';
import { useQuery, useSuspenseQuery } from '@tanstack/react-query';

export const USER_QUERY_KEY = 'user';

export const useGetSuspenseUser = (options?: UseSuspenseQueryOptions<UserResponse>) =>
  useSuspenseQuery<UserResponse>({
    queryKey: [USER_QUERY_KEY],
    queryFn: getUser,
    ...options,
  });

export const useGetUser = (options?: UseQueryOptions<UserResponse>) =>
  useQuery<UserResponse>({
    queryKey: [USER_QUERY_KEY],
    queryFn: getUser,
    ...options,
  });

export const useUserQueryOptions = {
  queryKey: [USER_QUERY_KEY],
  queryFn: getUser,
};
