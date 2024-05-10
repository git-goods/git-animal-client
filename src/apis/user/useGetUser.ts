import type { UseQueryOptions } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';

import type { UserSchema } from '@/schema/user';

import { get } from '..';

export const getUserByToken = async (token: string): Promise<UserSchema> =>
  get('/users', {
    headers: {
      Authorization: token,
    },
  });

export const useGetUser = (option?: UseQueryOptions<UserSchema>) =>
  useQuery<UserSchema>({
    queryKey: ['user'],
    queryFn: () => get('/users'),
    ...option,
  });
