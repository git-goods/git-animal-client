import axios from 'axios';
import { setInterceptors } from '../_interceptor';

const API_URL = 'https://api.gitanimals.org';

const instance = setInterceptors(
  axios.create({
    baseURL: API_URL,
    timeout: 15000,
    headers: {},
  }),
);

export const setInstanceToken = (token: string) => {
  instance.defaults.headers.common['Authorization'] = token;
};

export const get = <T>(...args: Parameters<typeof instance.get>) => {
  return instance.get<T, T>(...args);
};

export const post = <T>(...args: Parameters<typeof instance.post>) => {
  return instance.post<T, T>(...args);
};

export const put = <T>(...args: Parameters<typeof instance.put>) => {
  return instance.put<T, T>(...args);
};

export const patch = <T>(...args: Parameters<typeof instance.patch>) => {
  return instance.patch<T, T>(...args);
};

export const del = <T>(...args: Parameters<typeof instance.delete>) => {
  return instance.delete<T, T>(...args);
};
