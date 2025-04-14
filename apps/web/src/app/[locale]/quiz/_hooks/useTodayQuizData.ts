import { quizQueries } from '@gitanimals/react-query';
import { useSuspenseQuery } from '@tanstack/react-query';

import { QUIZ_RESULT } from '../_constants/quiz.constants';

const QUIZ_SOLVE_MAXIMUM_POINT = 32000;

const useTodayQuizData = () => {
  const { data: quizToday } = useSuspenseQuery(quizQueries.getQuizTodayOptions());

  const { isSolved, prize, result } = quizToday;

  const getQuizSolveCardTitle = () => {
    if (!isSolved) {
      return 'Solve Quiz';
    }

    switch (result) {
      case QUIZ_RESULT.FAIL:
        return `Quiz Failed`;
      case QUIZ_RESULT.SUCCESS:
      case QUIZ_RESULT.DONE:
        return 'Quiz Solved';
      default:
        return '';
    }
  };

  const getQuizSolveCardDescription = () => {
    if (!isSolved) {
      return `Solve random quiz and get up to ${QUIZ_SOLVE_MAXIMUM_POINT}P! You can only try once a day.`;
    }

    switch (result) {
      case QUIZ_RESULT.FAIL:
        return `Failed today's quiz`;
      case QUIZ_RESULT.SUCCESS:
      case QUIZ_RESULT.DONE:
        return `Already solved today and earned ${prize}P`;
      default:
        return '';
    }
  };

  const getQuizSolveCardPoint = () => {
    if (!isSolved) {
      return `Up to ${QUIZ_SOLVE_MAXIMUM_POINT}P`;
    }

    switch (result) {
      case QUIZ_RESULT.FAIL:
        return `Better Luck Tomorrow!`;
      case QUIZ_RESULT.SUCCESS:
      case QUIZ_RESULT.DONE:
        return `Earned ${prize}P`;
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
