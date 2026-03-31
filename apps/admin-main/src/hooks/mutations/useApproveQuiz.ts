import { useMutation, useQueryClient } from "@tanstack/react-query";

import { approveQuiz } from "@/lib/api/quiz";
import { queryKeys } from "@/lib/query/keys";

export const useApproveQuiz = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ quizId, reason }: { quizId: string; reason: string }) =>
      approveQuiz(quizId, { reason }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.quizs.notApproved() });
      queryClient.invalidateQueries({ queryKey: queryKeys.quizs.approved() });
    },
  });
};
