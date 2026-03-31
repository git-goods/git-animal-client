import { useInfiniteQuery } from "@tanstack/react-query";

import { getQuizSolveContexts } from "@/lib/api/quiz";
import { queryKeys } from "@/lib/query/keys";

export const useQuizSolveContexts = (userId: string) => {
  return useInfiniteQuery({
    queryKey: queryKeys.quizs.solveContexts(userId),
    queryFn: ({ pageParam }) => getQuizSolveContexts({ userId, lastId: pageParam }),
    initialPageParam: undefined as string | undefined,
    getNextPageParam: (lastPage) => lastPage.nextId ?? undefined,
    enabled: userId.trim().length > 0,
  });
};
