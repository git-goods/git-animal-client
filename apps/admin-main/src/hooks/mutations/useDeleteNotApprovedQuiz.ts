import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deleteNotApprovedQuiz } from "@/lib/api/quiz";
import { queryKeys } from "@/lib/query/keys";

export const useDeleteNotApprovedQuiz = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ quizId, reason }: { quizId: string; reason: string }) =>
      deleteNotApprovedQuiz(quizId, { reason }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.quizs.notApproved() });
    },
  });
};
