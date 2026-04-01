import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deleteApprovedQuiz } from "@/lib/api/quiz";
import { queryKeys } from "@/lib/query/keys";

export const useDeleteApprovedQuiz = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ quizId, reason }: { quizId: string; reason: string }) =>
      deleteApprovedQuiz(quizId, { reason }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.quizs.approved() });
    },
  });
};
