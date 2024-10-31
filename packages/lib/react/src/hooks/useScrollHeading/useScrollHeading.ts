import { useRef, useEffect } from 'react';

/**
 * URL 해시값과 일치하는 제목 요소로 스크롤하는 훅
 * @param hash - 제목 요소의 hash 값
 * @returns 제목 요소에 연결할 ref 객체
 * @example
 * ```tsx
 * function Component() {
 *   const headingRef = useScrollHeading('section-1');
 *   return <h2 ref={headingRef}>Section 1</h2>
 * }
 * ```
 */
export const useScrollHeading = (hash: string, options?: ScrollIntoViewOptions) => {
  const ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const _hash = window.location.hash;
    if (_hash === `#${hash}`) {
      ref.current?.scrollIntoView({ behavior: 'smooth', ...options });
    }
  }, []);

  return ref;
};
