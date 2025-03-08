'use client';

import React from 'react';

import SelectCategorySection from '@/app/[locale]/quiz/solve/(status)/_notStarted/SelectCategorySection';
import SolvingSection from '@/app/[locale]/quiz/solve/(status)/_solving/SolvingSection';
import { SOLVE_QUIZ_STATUS } from '@/app/[locale]/quiz/solve/solveQuiz.constants';
import { useSolveQuizContext } from '@/app/[locale]/quiz/solve/SolveQuizContext';

const SolveQuizSection = () => {
  // rs 데이터 응답 상태에 따른 section 렌더링 분기 처리
  // https://github.com/git-goods/gitanimals-api/blob/main/docs/api/quiz/solve_today_quiz.md#response-1

  // TODO:: UI 작업을 위한 임시 status
  const { status } = useSolveQuizContext();

  if (status === SOLVE_QUIZ_STATUS.NOT_STARTED) {
    return <SelectCategorySection />;
  }

  if (status === SOLVE_QUIZ_STATUS.SOLVING) {
    return <SolvingSection />;
  }

  return null;
};

export default SolveQuizSection;
