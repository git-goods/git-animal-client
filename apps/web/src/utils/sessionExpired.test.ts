import { CustomException } from '@gitanimals/exception';
import { describe, expect, it } from 'vitest';

import { isTokenExpiredError } from './sessionExpired';

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
