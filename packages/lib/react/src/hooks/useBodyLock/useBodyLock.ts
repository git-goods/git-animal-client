import { useEffect } from 'react';

/**
 * useBodyLock 훅
 * 모달이나 팝업이 열렸을 때 body의 스크롤을 잠그는 데 사용됩니다.
 *
 * @param isLocked body 스크롤을 잠글지 여부를 결정하는 불리언 값
 */
export function useBodyLock(isLocked: boolean): void {
  useEffect(() => {
    const originalStyle = window.getComputedStyle(document.body);
    const originalOverflow = originalStyle.overflow;

    if (isLocked) {
      // 현재 스크롤 위치 저장
      const scrollY = window.scrollY;

      // body에 스타일 적용
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      document.body.style.overflowY = 'scroll';
    } else {
      // body 스타일 제거
      const scrollY = document.body.style.top;
      document.body.style.overflow = originalOverflow;
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';

      // 스크롤 위치 복원
      window.scrollTo(0, Number(scrollY.replace('px', '') || '0') * -1);
    }
  }, [isLocked]);
}
