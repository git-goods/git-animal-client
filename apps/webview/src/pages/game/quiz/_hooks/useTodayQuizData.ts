import { useTranslation } from 'react-i18next';
import { quizQueries } from '@gitanimals/react-query';
import { useSuspenseQuery } from '@tanstack/react-query';

import { QUIZ_RESULT } from '../_constants/quiz.constants';
import { customT } from '../_utils/quiz.intl';

const QUIZ_SOLVE_MAXIMUM_POINT = 32000;

const useTodayQuizData = () => {
  const { t } = useTranslation('quiz');
  const { data: quizToday } = useSuspenseQuery(quizQueries.getQuizTodayOptions());

  const { isSolved, prize, result } = quizToday;

  const getQuizSolveCardTitle = () => {
    if (!isSolved) {
      return t('solve-quiz-card-title.not-started');
    }

    switch (result) {
      case QUIZ_RESULT.FAIL:
        return t('solve-quiz-card-title.fail');
      case QUIZ_RESULT.SUCCESS:
      case QUIZ_RESULT.DONE:
        return t('solve-quiz-card-title.done');
      default:
        return '';
    }
  };

  const getQuizSolveCardDescription = () => {
    if (!isSolved) {
      return customT(t('solve-quiz-card-description.not-started'), { point: String(QUIZ_SOLVE_MAXIMUM_POINT) });
    }

    switch (result) {
      case QUIZ_RESULT.FAIL:
        return t('solve-quiz-card-description.fail');
      case QUIZ_RESULT.SUCCESS:
      case QUIZ_RESULT.DONE:
        return customT(t('solve-quiz-card-description.done'), { point: prize });
      default:
        return '';
    }
  };

  const getQuizSolveCardPoint = () => {
    if (!isSolved) {
      return customT(t('solve-quiz-card-point.not-started'), { point: String(QUIZ_SOLVE_MAXIMUM_POINT) });
    }

    switch (result) {
      case QUIZ_RESULT.FAIL:
        return t('solve-quiz-card-point.fail');
      case QUIZ_RESULT.SUCCESS:
      case QUIZ_RESULT.DONE:
        return customT(t('solve-quiz-card-point.done'), { point: prize });
      default:
        return '';
    }
  };

  const quizSolveCard = {
    title: getQuizSolveCardTitle(),
    description: getQuizSolveCardDescription(),
    point: getQuizSolveCardPoint(),
  };

  return { isSolved, quizSolveCard };
};

export default useTodayQuizData;
