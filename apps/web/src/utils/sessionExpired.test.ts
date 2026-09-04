import { CustomException } from '@gitanimals/exception';
import { describe, expect, it } from 'vitest';

import { isAuthFailureResponse, isTokenExpiredError } from './sessionExpired';

describe('isTokenExpiredError', () => {
  it('인터셉터가 던지는 CustomException 을 잡는다', () => {
    expect(isTokenExpiredError(new CustomException('TOKEN_EXPIRED', 'token expired'))).toBe(true);
  });

  it('라우트 경계로 넘어가 직렬화된 형태(인스턴스 아님)도 잡는다', () => {
    expect(isTokenExpiredError({ name: 'CustomException', message: 'token expired' })).toBe(true);
  });

  it('다른 CustomException 은 통과시켜 에러 화면이 뜨게 둔다', () => {
    expect(isTokenExpiredError(new CustomException('NETWORK_ERROR'))).toBe(false);
  });

  it('일반 에러와 비객체는 false', () => {
    expect(isTokenExpiredError(new Error('token expired'))).toBe(false);
    expect(isTokenExpiredError(null)).toBe(false);
    expect(isTokenExpiredError('token expired')).toBe(false);
  });
});

// 실측(api.gitanimals.org, 2026-09-04):
//   헤더 없음      → 401 "Required request header 'Authorization' ... is not present"
//   만료·무효 토큰 → 400 "Authorization fail"
describe('isAuthFailureResponse', () => {
  it('헤더 누락 401 을 인증 실패로 본다', () => {
    expect(isAuthFailureResponse(401, { message: "Required request header 'Authorization' is not present" })).toBe(
      true,
    );
  });

  it('만료 토큰의 400 "Authorization fail" 을 인증 실패로 본다', () => {
    expect(isAuthFailureResponse(400, { message: 'Authorization fail' })).toBe(true);
  });

  it('평범한 400 은 인증 실패가 아니다 — 세션 만료 다이얼로그가 뜨면 안 된다', () => {
    expect(isAuthFailureResponse(400, { message: 'invalid personaId' })).toBe(false);
    expect(isAuthFailureResponse(400, undefined)).toBe(false);
  });

  it('그 외 상태 코드는 통과시킨다', () => {
    expect(isAuthFailureResponse(500, { message: 'Authorization fail' })).toBe(false);
    expect(isAuthFailureResponse(undefined, undefined)).toBe(false);
  });
});
