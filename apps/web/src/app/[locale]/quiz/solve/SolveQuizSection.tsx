'use client';

import React from 'react';

import SelectCategorySection from '@/app/[locale]/quiz/solve/(status)/_notStarted/SelectCategorySection';

type SolveQuizStatus = 'NOT_STARTED' | 'SOLVING' | 'SUCCESS' | 'FAIL' | 'DONE';

const SolveQuizSection = () => {
  // rs 데이터 응답 상태에 따른 section 렌더링 분기 처리
  // https://github.com/git-goods/gitanimals-api/blob/main/docs/api/quiz/solve_today_quiz.md#response-1

  // TODO:: UI 작업을 위한 임시 status
  const status: SolveQuizStatus = 'NOT_STARTED';

  if (status === 'NOT_STARTED') {
    return <SelectCategorySection />;
  }

  return null;
};

export default SolveQuizSection;
