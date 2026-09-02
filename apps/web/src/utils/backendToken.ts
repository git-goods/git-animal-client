// NextAuth 세션은 30일 롤링, 백엔드 accessToken 은 7일. 그 사이 구간에서 모든 API 가 401 을 받는다 (gitanimals#506).

interface JwtPayload {
  exp?: number;
}

const decodePayload = (jwt: string): JwtPayload | null => {
  const payload = jwt.split('.')[1];
  if (!payload) return null;

  try {
    const base64 = payload.replace(/-/g, '+').replace(/_/g, '/');
    return JSON.parse(atob(base64.padEnd(Math.ceil(base64.length / 4) * 4, '=')));
  } catch {
    return null;
  }
};

export const isBackendTokenExpired = (accessToken: unknown, now: number = Date.now()): boolean => {
  if (typeof accessToken !== 'string' || accessToken.length === 0) return true;

  // 해독 불가하거나 exp 가 없으면 판정하지 않는다. 서명 검증은 백엔드 몫이다.
  const exp = decodePayload(accessToken)?.exp;
  if (typeof exp !== 'number') return false;

  return exp * 1000 <= now;
};
