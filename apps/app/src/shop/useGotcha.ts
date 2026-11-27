import { useEffect, useRef, useState } from 'react';
import { postGotcha, type GotchaResult } from '@gitanimals/api';
import { userQueries } from '@gitanimals/react-query';
import { useQueryClient } from '@tanstack/react-query';

export const GOTCHA_PRICE = 1000;

// 화면에 들어오면 한 번만 뽑는다. 개발 모드에서 effect 가 두 번 돌아도 포인트가 두 번 빠지지 않게 ref 로 막는다
export function useGotcha(count: number) {
  const queryClient = useQueryClient();
  const started = useRef(false);
  const [state, setState] = useState<{ results?: GotchaResult[]; failed?: boolean }>({});

  useEffect(() => {
    if (started.current) return;
    started.current = true;
    postGotcha({ count })
      .then((res) => {
        setState({ results: res.gotchaResults });
        // userKey 는 ['user'] 라 포인트와 펫 목록을 함께 다시 불러온다
        void queryClient.invalidateQueries({ queryKey: userQueries.userKey() });
      })
      .catch(() => setState({ failed: true }));
  }, [count, queryClient]);

  return state;
}
