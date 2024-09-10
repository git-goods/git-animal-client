// export const getUserByToken = async (token: string): Promise<UserSchema> =>
//   get('/users', {
//     headers: {
//       Authorization: token,
//     },
//   });
import { getServerSession } from 'next-auth';
import { getSession, signOut } from 'next-auth/react';
import type { ApiErrorScheme, UserResponse } from '@gitanimals/api';
import { getUser as packageGetUser } from '@gitanimals/api';
import type { UseSuspenseQueryOptions } from '@tanstack/react-query';
import { useSuspenseQuery } from '@tanstack/react-query';
import type { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import axios from 'axios';

import { authOptions } from '@/auth';

import { setInterceptors } from '../interceptor';

export const USER_QUERY_KEY = 'user';

// export const useGetUser = (option?: UseQueryOptions<UserSchema>) =>
//   useQuery<UserSchema>({
//     queryKey: [USER_QUERY_KEY],
//     queryFn: () => get('/users'),
//     ...option,
//   });

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
const API_URL = 'https://api.gitanimals.org';

const axiosInstance = setInterceptors(
  axios.create({
    baseURL: API_URL,
    timeout: 15000,
    headers: {},
  }),
);

const interceptorRequestFulfilled = async (config: InternalAxiosRequestConfig) => {
  let session;
  if (typeof window !== 'undefined') {
    // session for client component
    session = await getSession();
  } else {
    // session for server component
    session = await getServerSession(authOptions);
  }

  const accessToken = session?.user?.accessToken;
  if (!config.headers) return config;

  if (accessToken) {
    console.log('accessToken: ', accessToken);
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
};

const interceptorResponseFulfilled = (res: AxiosResponse) => {
  if (200 <= res.status && res.status < 300) {
    return res.data;
  }

  return Promise.reject(res.data);
};

// Response interceptor
const interceptorResponseRejected = (error: AxiosError<ApiErrorScheme>) => {
  if (error.response?.status === 401) {
    // TODO : logout and refresh login
    // TODO : logout 안내
  }

  // 403 처리

  return Promise.reject(error);
};

axiosInstance.interceptors.request.use(interceptorRequestFulfilled);
axiosInstance.interceptors.response.use(interceptorResponseFulfilled, interceptorResponseRejected);

// export const getUser2 = async (): Promise<UserSchema> => axiosInstance.get('/users', {});

export const useGetSuspenseUser = (options?: UseSuspenseQueryOptions<UserResponse>) =>
  useSuspenseQuery<UserResponse>({
    queryKey: [USER_QUERY_KEY],
    queryFn: () => getUser(),
    ...options,
  });
