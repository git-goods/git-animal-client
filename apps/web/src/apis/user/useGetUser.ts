'use client';

import { signOut } from 'next-auth/react';
import type { UserResponse } from '@gitanimals/api';
import { getUser as packageGetUser } from '@gitanimals/api';
import type { UseQueryOptions, UseSuspenseQueryOptions } from '@tanstack/react-query';
import { useQuery, useSuspenseQuery } from '@tanstack/react-query';
import axios from 'axios';

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

const getUser = async () => {
  try {
    return await packageGetUser();
  } catch (error: any) {
    // TODO : logout 로직
    // interceptor 등 다른곳에서 처리해야하는데, 일단 해당 API는 안부르는 곳이 없으니까 여기서 처리
    if (error.response?.status === 401) {
      if (typeof window !== 'undefined') {
        signOut();
      } else {
        axios.get('/api/auth/signOut');
      }
      return null;
    }
    return error;
  }
};

export const useGetSuspenseUser = (options?: UseSuspenseQueryOptions<UserResponse>) =>
  useSuspenseQuery<UserResponse>({
    queryKey: [USER_QUERY_KEY],
    queryFn: getUser,
    ...options,
  });
