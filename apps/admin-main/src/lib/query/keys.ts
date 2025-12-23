/**
 * React Query 키 팩토리
 *
 * 일관된 쿼리 키 관리를 위한 유틸리티
 * 각 도메인별로 쿼리 키를 생성하는 함수 제공
 *
 * @example
 * // 모든 사용자 목록
 * queryKeys.users.all
 *
 * // 특정 사용자 상세
 * queryKeys.users.detail(userId)
 *
 * // 사용자 목록 (필터링)
 * queryKeys.users.list({ status: 'active' })
 */

export const queryKeys = {
  // 사용자 관련 쿼리
  users: {
    all: ["users"] as const,
    lists: () => [...queryKeys.users.all, "list"] as const,
    list: (filters?: Record<string, unknown>) => [...queryKeys.users.lists(), filters] as const,
    details: () => [...queryKeys.users.all, "detail"] as const,
    detail: (id: string | number) => [...queryKeys.users.details(), id] as const,
  },

  // 포인트 관련 쿼리
  points: {
    all: ["points"] as const,
    lists: () => [...queryKeys.points.all, "list"] as const,
    list: (filters?: Record<string, unknown>) => [...queryKeys.points.lists(), filters] as const,
    details: () => [...queryKeys.points.all, "detail"] as const,
    detail: (id: string | number) => [...queryKeys.points.details(), id] as const,
    transactions: (userId?: string | number) =>
      [...queryKeys.points.all, "transactions", userId] as const,
  },

  // 대시보드 관련 쿼리
  dashboard: {
    all: ["dashboard"] as const,
    summary: () => [...queryKeys.dashboard.all, "summary"] as const,
    analytics: (period?: string) => [...queryKeys.dashboard.all, "analytics", period] as const,
  },

  // 분석 관련 쿼리
  analytics: {
    all: ["analytics"] as const,
    reports: (type?: string) => [...queryKeys.analytics.all, "reports", type] as const,
  },
} as const;
