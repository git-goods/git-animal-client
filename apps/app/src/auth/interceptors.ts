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
      // 예전 토큰으로 나간 요청의 401 이 새로 로그인한 세션을 끊지 않게 한다
      const sent = error?.config?.headers?.Authorization;
      const token = current?.getToken() ?? null;
      const stale = !!sent && sent !== `Bearer ${token}`;
      if (error?.response?.status === 401 && !stale) current?.onUnauthorized();
      return Promise.reject(error);
    },
  );
}
