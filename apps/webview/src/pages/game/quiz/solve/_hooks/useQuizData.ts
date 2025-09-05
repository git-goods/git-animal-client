import { quizQueries } from '@gitanimals/react-query';
import { useSuspenseQuery } from '@tanstack/react-query';

import { useTranslation } from 'react-i18next';

interface Props {
  contextId: string;
}

const useQuizData = ({ contextId }: Props) => {
  const { i18n } = useTranslation();
  const locale = i18n.language as 'en_US' | 'ko_KR';

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
