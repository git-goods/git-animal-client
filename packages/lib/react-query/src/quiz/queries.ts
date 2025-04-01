import { getQuiz, getRoundResult } from '@gitanimals/api';
import { queryOptions } from '@tanstack/react-query';

interface QuizCommonHeader {
  locale: 'en_US' | 'ko_KR';
}

export const quizQueries = {
  allKey: () => ['quiz'],
  quizKey: () => quizQueries.allKey(),
  getQuiz: (contextId: string) => ['quiz', contextId],
  getQuizOptions: (request: { contextId: string } & QuizCommonHeader) =>
    queryOptions({
      queryKey: quizQueries.getQuiz(request.contextId),
      queryFn: () => getQuiz(request),
    }),
  getRoundResult: (contextId: string) => ['quiz', contextId, 'round-result'],
  getRoundResultOptions: (request: { contextId: string } & QuizCommonHeader) =>
    queryOptions({
      queryKey: quizQueries.getRoundResult(request.contextId),
      queryFn: () => getRoundResult(request),
    }),
};
