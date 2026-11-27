import { setRequestInterceptor, setResponseInterceptor } from '@gitanimals/api';

type Deps = { getToken: () => string | null; onUnauthorized: () => void };

let installed = false;
let current: Deps | null = null;

// axios 인터셉터는 한 번만 등록하고, 호출마다 최신 deps 로 교체한다 (Provider 재마운트 대비)
export function installInterceptors(deps: Deps) {
  current = deps;
  if (installed) return;
  installed = true;

  setRequestInterceptor((config) => {
    const token = current?.getToken() ?? null;
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  });

  setResponseInterceptor(
    (response) => response,
    (error) => {
      if (error?.response?.status === 401) current?.onUnauthorized();
      return Promise.reject(error);
    },
  );
}
