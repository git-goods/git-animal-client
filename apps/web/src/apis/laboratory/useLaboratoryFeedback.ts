import type { UseMutationOptions, UseQueryOptions } from '@tanstack/react-query';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import type {
  CheckFeedbackResponse,
  CreateFeedbackRequest,
  LaboratoryFeedback,
} from './feedback';
import {
  checkUserFeedback,
  createOrUpdateFeedback,
  getAllFeedback,
  getFeedbackCount,
} from './feedback';

const QUERY_KEYS = {
  all: ['laboratory-feedback'] as const,
  count: ['laboratory-feedback', 'count'] as const,
  userCheck: (userId: string) => ['laboratory-feedback', 'user', userId] as const,
};

/**
 * Hook to create or update laboratory feedback
 */
export const useCreateLaboratoryFeedback = (
  options?: UseMutationOptions<LaboratoryFeedback, Error, CreateFeedbackRequest>,
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createOrUpdateFeedback,
    onSuccess: (data, variables) => {
      // Invalidate relevant queries
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.all });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.count });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.userCheck(variables.user_id) });
    },
    ...options,
  });
};

/**
 * Hook to check if user has upvoted
 */
export const useCheckUserFeedback = (
  userId: string | undefined,
  options?: Omit<UseQueryOptions<CheckFeedbackResponse, Error>, 'queryKey' | 'queryFn'>,
) => {
  return useQuery({
    queryKey: QUERY_KEYS.userCheck(userId ?? ''),
    queryFn: () => checkUserFeedback(userId!),
    enabled: !!userId,
    ...options,
  });
};

/**
 * Hook to get all laboratory feedback
 */
export const useGetAllFeedback = (
  options?: Omit<UseQueryOptions<LaboratoryFeedback[], Error>, 'queryKey' | 'queryFn'>,
) => {
  return useQuery({
    queryKey: QUERY_KEYS.all,
    queryFn: getAllFeedback,
    ...options,
  });
};

/**
 * Hook to get feedback count
 */
export const useGetFeedbackCount = (
  options?: Omit<UseQueryOptions<number, Error>, 'queryKey' | 'queryFn'>,
) => {
  return useQuery({
    queryKey: QUERY_KEYS.count,
    queryFn: getFeedbackCount,
    ...options,
  });
};
