import { useLocale } from 'next-intl';
import { quizQueries } from '@gitanimals/react-query';
import { useSuspenseQuery } from '@tanstack/react-query';

import type { Locale } from '@/i18n/routing';

interface Props {
  contextId: string;
}

const useQuizData = ({ contextId }: Props) => {
  const locale = useLocale() as Locale;
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
