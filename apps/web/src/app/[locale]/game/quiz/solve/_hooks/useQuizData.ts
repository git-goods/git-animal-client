import { quizQueries } from '@gitanimals/react-query';
import { useSuspenseQuery } from '@tanstack/react-query';

import { useSegmentLocale } from '@/i18n/useSegmentLocale';

interface Props {
  contextId: string;
}

const useQuizData = ({ contextId }: Props) => {
  const locale = useSegmentLocale();
  const { data, refetch: refetchQuiz } = useSuspenseQuery(
    quizQueries.getQuizOptions({
      contextId,
      locale,
    }),
  );

  const { round, level, category, problem, prize, status } = data;
  return { round, level, category, problem, prize, status, refetchQuiz };
};

export default useQuizData;
