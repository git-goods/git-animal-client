import { useEffect, useRef } from 'react';
import { userQueries, usePostGotcha } from '@gitanimals/react-query';
import { useQueryClient } from '@tanstack/react-query';

export const GOTCHA_PRICE = 1000;

// 화면에 들어오면 한 번만 뽑는다. 개발 모드에서 effect 가 두 번 돌아도 포인트가 두 번 빠지지 않게 ref 로 막는다
export function useGotcha(count: number) {
  const queryClient = useQueryClient();
  const started = useRef(false);
  // userKey 는 ['user'] 라 포인트와 펫 목록을 함께 다시 불러온다
  const { mutate, data, isError } = usePostGotcha({
    onSuccess: () => queryClient.invalidateQueries({ queryKey: userQueries.userKey() }),
  });

  useEffect(() => {
    if (started.current) return;
    started.current = true;
    mutate({ count });
  }, [count, mutate]);

  return { results: data?.gotchaResults, failed: isError };
}
