import { useInfiniteQuery } from "@tanstack/react-query";

import { getNotApprovedQuizs, type QuizScrollParams } from "@/lib/api/quiz";
import { queryKeys } from "@/lib/query/keys";

export const useNotApprovedQuizs = (filters: Omit<QuizScrollParams, "lastId">) => {
  return useInfiniteQuery({
    queryKey: queryKeys.quizs.notApprovedList(filters),
    queryFn: ({ pageParam }) => getNotApprovedQuizs({ ...filters, lastId: pageParam }),
    initialPageParam: undefined as string | undefined,
    getNextPageParam: (lastPage) => lastPage.nextId ?? undefined,
  });
};
