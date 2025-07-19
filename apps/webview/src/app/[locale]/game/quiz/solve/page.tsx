'use client';

import { useState } from 'react';

import SelectCategorySection from '@/app/[locale]/game/quiz/solve/_components/notStarted/SelectCategorySection';
import SolvingQuizSection from '@/app/[locale]/game/quiz/solve/_components/solving/SolvingQuizSection';
import type { QuizStatus } from '@/app/[locale]/game/quiz/solve/_constants/solveQuiz.constants';
import { QUIZ_STATUS } from '@/app/[locale]/game/quiz/solve/_constants/solveQuiz.constants';

function SolveQuizPage() {
  // rs 데이터 응답 상태에 따른 section 렌더링 분기 처리
  // https://github.com/git-goods/gitanimals-api/blob/main/docs/api/quiz/solve_today_quiz.md#response-1

  // TODO:: UI 작업을 위한 임시 status
  const [status, setStatus] = useState<QuizStatus>(QUIZ_STATUS.NOT_STARTED);
  const [contextId, setContextId] = useState<string | null>(null);

  if (status === QUIZ_STATUS.NOT_STARTED) {
    return <SelectCategorySection setStatus={setStatus} setContextId={setContextId} />;
  }

  if (status === QUIZ_STATUS.SOLVING && contextId) {
    return <SolvingQuizSection contextId={contextId} />;
  }

  return null;
}

export default SolveQuizPage;
