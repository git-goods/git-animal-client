import { CustomException } from '@gitanimals/exception';
import axios from 'axios';

// 서버가 5xx 본문을 "UN HANDLED EXCEPTION" 한 줄로만 주기 때문에 상태 코드로 구분한다 (git-goods/gitanimals#507)
export type GachaErrorKind = 'token-expired' | 'server' | 'timeout' | 'network' | 'unknown';

// token-expired 는 재로그인으로 넘어가서 화면 안내 대상이 아니다
export type GachaFailureKind = Exclude<GachaErrorKind, 'token-expired'>;

export const getGachaErrorKind = (error: unknown): GachaErrorKind => {
  if (error instanceof CustomException && error.code === 'TOKEN_EXPIRED') return 'token-expired';

  if (axios.isAxiosError(error)) {
    if (error.code === 'ECONNABORTED' || error.code === 'ETIMEDOUT') return 'timeout';
    if (!error.response) return 'network';
    if (error.response.status >= 500) return 'server';
  }

  return 'unknown';
};
