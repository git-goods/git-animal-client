import { useInfiniteQuery } from "@tanstack/react-query";

import { getApprovedQuizs, type QuizScrollParams } from "@/lib/api/quiz";
import { queryKeys } from "@/lib/query/keys";

export const useApprovedQuizs = (filters: Omit<QuizScrollParams, "lastId">) => {
  return useInfiniteQuery({
    queryKey: queryKeys.quizs.approvedList(filters),
    queryFn: ({ pageParam }) => getApprovedQuizs({ ...filters, lastId: pageParam }),
    initialPageParam: undefined as string | undefined,
    getNextPageParam: (lastPage) => lastPage.nextId ?? undefined,
  });
};
