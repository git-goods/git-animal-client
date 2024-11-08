import { useEffect } from 'react';

/**
 * useBodyLock 훅
 * 모달이나 팝업이 열렸을 때 body의 스크롤을 잠그는 데 사용됩니다.
 *
 * @param isLocked body 스크롤을 잠글지 여부를 결정하는 불리언 값
 */
export function useBodyLock(isLocked: boolean): void {
  useEffect(() => {
    if (isLocked) {
      // 현재 스크롤 위치 저장
      const scrollY = window.scrollY;

      // body에 스타일 적용
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.left = '0';
      document.body.style.right = '0';
      document.body.style.overflow = 'hidden'; // scroll 대신 hidden 사용
    } else {
      // 스크롤 위치 복원을 위해 먼저 저장된 위치 가져오기
      const scrollY = parseInt(document.body.style.top || '0') * -1;

      // body 스타일 초기화
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.left = '';
      document.body.style.right = '';
      document.body.style.overflow = '';

      // 스크롤 위치 복원
      window.scrollTo(0, scrollY);
    }

    // cleanup 함수 추가
    return () => {
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.left = '';
      document.body.style.right = '';
      document.body.style.overflow = '';
    };
  }, [isLocked]);
}
