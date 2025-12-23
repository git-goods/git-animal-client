import { QueryClient } from "@tanstack/react-query";

/**
 * TanStack Query 클라이언트 설정
 *
 * 기본 설정:
 * - staleTime: 1분 (데이터가 stale 상태가 되기까지의 시간)
 * - cacheTime: 5분 (사용되지 않는 데이터가 캐시에 남아있는 시간)
 * - refetchOnWindowFocus: false (윈도우 포커스 시 자동 리페치 비활성화)
 * - retry: 1 (실패 시 1번만 재시도)
 */
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // 데이터가 stale 상태가 되기까지의 시간 (1분)
      staleTime: 60 * 1000,

      // 사용되지 않는 데이터가 캐시에 남아있는 시간 (5분)
      gcTime: 5 * 60 * 1000,

      // 윈도우 포커스 시 자동 리페치 비활성화
      refetchOnWindowFocus: false,

      // 네트워크 재연결 시 자동 리페치
      refetchOnReconnect: true,

      // 마운트 시 자동 리페치
      refetchOnMount: true,

      // 실패 시 재시도 횟수
      retry: 1,

      // 재시도 지연 시간 계산 함수
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    },
    mutations: {
      // mutation 실패 시 재시도 비활성화
      retry: false,
    },
  },
});
