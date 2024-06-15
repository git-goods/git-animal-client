import axios from 'axios';

import { setInterceptors } from './interceptor';

const API_URL = 'https://render.gitanimals.org';

const instance = setInterceptors(
  axios.create({
    baseURL: API_URL,
    timeout: 15000,
  }),
);

export const renderGet = <T>(...args: Parameters<typeof instance.get>) => {
  return instance.get<T, T>(...args);
};

export const renderPost = <T>(...args: Parameters<typeof instance.post>) => {
  return instance.post<T, T>(...args);
};

export const renderPut = <T>(...args: Parameters<typeof instance.put>) => {
  return instance.put<T, T>(...args);
};

export const renderPatch = <T>(...args: Parameters<typeof instance.patch>) => {
  return instance.patch<T, T>(...args);
};

export const renderDelete = <T>(...args: Parameters<typeof instance.delete>) => {
  return instance.delete<T, T>(...args);
};
