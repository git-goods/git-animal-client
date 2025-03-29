import { useState } from 'react';

import type { QuizStatus } from '@/app/[locale]/quiz/solve/solveQuiz.constants';
import { QUIZ_STATUS } from '@/app/[locale]/quiz/solve/solveQuiz.constants';

const useQuizDialogStatus = () => {
  const [result, setResult] = useState<QuizStatus>(QUIZ_STATUS.SOLVING);

  const correctDialog = {
    isOpen: result === QUIZ_STATUS.SUCCESS,
    open: () => setResult(QUIZ_STATUS.SUCCESS),
    close: () => setResult(QUIZ_STATUS.SOLVING),
  };

  const failDialog = {
    isOpen: result === QUIZ_STATUS.FAIL,
    open: () => setResult(QUIZ_STATUS.FAIL),
    close: () => setResult(QUIZ_STATUS.SOLVING),
  };

  const completeDialog = {
    isOpen: result === QUIZ_STATUS.DONE,
    open: () => setResult(QUIZ_STATUS.DONE),
    close: () => setResult(QUIZ_STATUS.SOLVING),
  };

  return {
    correctDialog,
    failDialog,
    completeDialog,
  };
};

export default useQuizDialogStatus;
