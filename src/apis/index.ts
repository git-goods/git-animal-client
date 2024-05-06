import type { AxiosInstance } from 'axios';
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const setInterceptors = (instance: AxiosInstance) => {
  instance.interceptors.request.use(
    async (config) => {
      return config;
    },
    (error) => {
      return Promise.reject(error);
    },
  );

  instance.interceptors.response.use(
    (response) => {
      return response?.data;
    },
    (error) => {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          // if (typeof window !== 'undefined') {
          //   window.location.href = ROUTER.AUTH.LOGIN + '?redirect=' + window.location.pathname;
          // }
        }
      }
      return Promise.reject(error);
    },
  );

  return instance;
};

export const api = setInterceptors(axios.create({ baseURL: API_URL }));
