import { useState } from 'react';

import type { QuizStatus } from '../_constants/solveQuiz.constants';
import { QUIZ_STATUS } from '../_constants/solveQuiz.constants';

interface UseQuizDialogStatusProps {
  setPrize: (prize: number) => void;
  setIsRoundEnd: (isRoundEnd: boolean) => void;
}

const useQuizDialogStatus = ({ setPrize, setIsRoundEnd }: UseQuizDialogStatusProps) => {
  const [result, setResult] = useState<QuizStatus>(QUIZ_STATUS.SOLVING);

  const correctDialog = {
    isOpen: result === QUIZ_STATUS.SUCCESS,
    open: (prize: number) => {
      setPrize(prize);
      setResult(QUIZ_STATUS.SUCCESS);
      setIsRoundEnd(true);
    },
    close: () => setResult(QUIZ_STATUS.SOLVING),
  };

  const failDialog = {
    isOpen: result === QUIZ_STATUS.FAIL,
    open: () => {
      setResult(QUIZ_STATUS.FAIL);
      setIsRoundEnd(true);
    },
    close: () => setResult(QUIZ_STATUS.SOLVING),
  };

  const completeDialog = {
    isOpen: result === QUIZ_STATUS.DONE,
    open: (prize: number) => {
      setPrize(prize);
      setResult(QUIZ_STATUS.DONE);
      setIsRoundEnd(true);
    },
    close: () => setResult(QUIZ_STATUS.SOLVING),
  };

  return {
    correctDialog,
    failDialog,
    completeDialog,
  };
};

export default useQuizDialogStatus;
