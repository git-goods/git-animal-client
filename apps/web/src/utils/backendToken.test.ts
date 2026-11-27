import { describe, expect, test } from 'vitest';

import { isBackendTokenExpired } from './backendToken';

const makeToken = (payload: object) =>
  `header.${Buffer.from(JSON.stringify(payload)).toString('base64url')}.signature`;

// gitanimals#506 에서 실제로 관측된 토큰 — 2026-07-27 발급, 2026-08-03 만료.
const EXPIRED_REAL_TOKEN = makeToken({ userId: 576292532337774901, username: 'sumi-0011', iat: 1785111263, exp: 1785716063 });

describe('isBackendTokenExpired', () => {
  test('실제 만료 토큰을 만료로 판정한다 (세션이 아직 살아 있어도)', () => {
    const sessionStillAlive = 1788311579 * 1000; // 2026-09-02, 세션 만료는 2026-10-02
    expect(isBackendTokenExpired(EXPIRED_REAL_TOKEN, sessionStillAlive)).toBe(true);
  });

  test('아직 유효한 토큰은 통과시킨다', () => {
    expect(isBackendTokenExpired(EXPIRED_REAL_TOKEN, 1785000000 * 1000)).toBe(false);
  });

  test('exp 시각 정각은 만료로 본다', () => {
    expect(isBackendTokenExpired(EXPIRED_REAL_TOKEN, 1785716063 * 1000)).toBe(true);
  });

  test('토큰이 없으면 만료로 본다', () => {
    expect(isBackendTokenExpired(undefined)).toBe(true);
    expect(isBackendTokenExpired(null)).toBe(true);
    expect(isBackendTokenExpired('')).toBe(true);
  });

  test('해독 불가하거나 exp 없는 토큰은 판정 불가 — 통과시킨다', () => {
    expect(isBackendTokenExpired('not-a-jwt')).toBe(false);
    expect(isBackendTokenExpired('header.%%%.signature')).toBe(false);
    expect(isBackendTokenExpired(makeToken({ username: 'sumi-0011' }))).toBe(false);
  });
});
