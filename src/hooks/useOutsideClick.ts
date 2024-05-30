import { type RefObject, useEffect } from 'react';

type UseOutsideClickProps = {
  ref: RefObject<HTMLElement>;
  handler: (event: MouseEvent) => void;
};

/**
 * @description ref를 제외한 영역을 클릭했을 때 실행되는 hook 입니다.
 * @param ref
 * @param handler 클릭 이벤트가 발생했을 때 실행되는 함수입니다.
 */
function useOutsideClick({ ref, handler }: UseOutsideClickProps) {
  useEffect(() => {
    const listener = (event: MouseEvent) => {
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return;
      }
      handler(event);
    };

    document.addEventListener('mousedown', listener);
    return () => {
      document.removeEventListener('mousedown', listener);
    };
  });
}

export default useOutsideClick;
