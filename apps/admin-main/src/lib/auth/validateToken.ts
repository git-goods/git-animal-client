import { getUsers } from "@/lib/api/identity";

import { authUtils } from "./index";

/**
 * 토큰 유효성 검증
 *
 * getUsers API를 호출하여 토큰이 유효한지 확인합니다.
 * - 성공(200): 토큰 유효함
 * - 실패(401): 토큰 만료 또는 유효하지 않음 → 로그아웃 처리
 * - 기타 에러: 네트워크 오류 등
 *
 * @returns {Promise<boolean>} 토큰 유효성 여부
 */
export async function validateToken(): Promise<boolean> {
  const token = authUtils.getToken();

  // 토큰이 없으면 즉시 false 반환
  if (!token) {
    return false;
  }

  try {
    // getUsers API 호출로 토큰 검증
    await getUsers();
    return true;
  } catch (error) {
    // 401 에러인 경우 토큰 제거
    if (error instanceof Error) {
      console.error("토큰 검증 실패:", error.message);
    }

    // 토큰 제거 (이미 인터셉터에서 401 처리가 되지만 명시적으로 제거)
    authUtils.removeToken();
    return false;
  }
}
