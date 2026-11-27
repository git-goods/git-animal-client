import { setRequestInterceptor, setResponseInterceptor } from '@gitanimals/api';

type Deps = { getToken: () => string | null; onUnauthorized: () => void };

let installed = false;

export function installInterceptors({ getToken, onUnauthorized }: Deps) {
  if (installed) return;
  installed = true;

  setRequestInterceptor((config) => {
    const token = getToken();
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  });

  setResponseInterceptor(
    (response) => response,
    (error) => {
      if (error?.response?.status === 401) onUnauthorized();
      return Promise.reject(error);
    },
  );
}
