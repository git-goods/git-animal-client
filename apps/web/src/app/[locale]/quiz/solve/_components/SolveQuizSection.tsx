'use client';

import SelectCategorySection from '@/app/[locale]/quiz/solve/_components/notStarted/SelectCategorySection';
import { useSolveQuizContext } from '@/app/[locale]/quiz/solve/_components/SolveQuizContext';
import SolvingQuizSection from '@/app/[locale]/quiz/solve/_components/solving/SolvingQuizSection';
import { QUIZ_STATUS } from '@/app/[locale]/quiz/solve/_constants/solveQuiz.constants';

const SolveQuizSection = () => {
  // rs 데이터 응답 상태에 따른 section 렌더링 분기 처리
  // https://github.com/git-goods/gitanimals-api/blob/main/docs/api/quiz/solve_today_quiz.md#response-1

  // TODO:: UI 작업을 위한 임시 status
  const { status } = useSolveQuizContext();

  if (status === QUIZ_STATUS.NOT_STARTED) {
    return <SelectCategorySection />;
  }

  if (status === QUIZ_STATUS.SOLVING) {
    return <SolvingQuizSection />;
  }

  return null;
};

export default SolveQuizSection;
