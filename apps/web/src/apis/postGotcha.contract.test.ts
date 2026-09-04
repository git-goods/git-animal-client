import { parseGotchaResponse } from '@gitanimals/api';
import { CustomException } from '@gitanimals/exception';
import { describe, expect, test } from 'vitest';

// 대상은 packages/api 지만 vitest 설정이 apps/web 에만 있다.

const validResult = { name: 'CAT', dropRate: '0.5%' };

describe('parseGotchaResponse — 뽑기 응답 계약', () => {
  test('정상 응답은 그대로 통과시킨다', () => {
    const response = { gotchaResults: [validResult, validResult] };
    expect(parseGotchaResponse(response).gotchaResults).toHaveLength(2);
  });

  test('gotchaResults 가 없으면 에러 (UI 가 진행중 상태에 갇히는 경로)', () => {
    expect(() => parseGotchaResponse({})).toThrow(CustomException);
  });

  test('gotchaResults 가 빈 배열이면 에러', () => {
    expect(() => parseGotchaResponse({ gotchaResults: [] })).toThrow(CustomException);
  });

  test('결과 항목의 필드가 빠지면 에러', () => {
    expect(() => parseGotchaResponse({ gotchaResults: [{ name: 'CAT' }] })).toThrow(CustomException);
  });

  test('null · 문자열 응답도 에러', () => {
    expect(() => parseGotchaResponse(null)).toThrow(CustomException);
    expect(() => parseGotchaResponse('<html>502 Bad Gateway</html>')).toThrow(CustomException);
  });

  test('에러 코드는 API_TYPE_NOT_MATCH — TOKEN_EXPIRED 분기와 섞이지 않는다', () => {
    try {
      parseGotchaResponse({});
      expect.unreachable();
    } catch (error) {
      expect(error).toBeInstanceOf(CustomException);
      expect((error as CustomException).code).toBe('API_TYPE_NOT_MATCH');
    }
  });
});
