import { CustomException } from '@gitanimals/exception';
import { AxiosError, AxiosHeaders } from 'axios';
import { describe, expect, it } from 'vitest';

import { getGachaErrorKind } from './gachaError';

const axiosErrorWithStatus = (status: number) => {
  const config = { headers: new AxiosHeaders() };
  return new AxiosError('failed', 'ERR_BAD_RESPONSE', config, {}, {
    status,
    statusText: '',
    data: { message: 'UN HANDLED EXCEPTION' },
    headers: {},
    config,
  } as never);
};

describe('getGachaErrorKind', () => {
  it('토큰 만료는 재로그인 흐름으로 구분한다', () => {
    expect(getGachaErrorKind(new CustomException('TOKEN_EXPIRED'))).toBe('token-expired');
  });

  it('5xx 는 서버 일시 장애로 구분한다 — #505/#506 의 실제 응답', () => {
    expect(getGachaErrorKind(axiosErrorWithStatus(500))).toBe('server');
    expect(getGachaErrorKind(axiosErrorWithStatus(503))).toBe('server');
  });

  it('타임아웃은 서버 에러와 구분한다', () => {
    const config = { headers: new AxiosHeaders() };
    expect(getGachaErrorKind(new AxiosError('timeout', 'ECONNABORTED', config))).toBe('timeout');
  });

  it('응답이 없으면 네트워크 문제로 구분한다', () => {
    const config = { headers: new AxiosHeaders() };
    expect(getGachaErrorKind(new AxiosError('network', 'ERR_NETWORK', config))).toBe('network');
  });

  it('4xx 와 일반 에러는 unknown 으로 떨어진다', () => {
    expect(getGachaErrorKind(axiosErrorWithStatus(400))).toBe('unknown');
    expect(getGachaErrorKind(new Error('boom'))).toBe('unknown');
    expect(getGachaErrorKind(undefined)).toBe('unknown');
  });
});
