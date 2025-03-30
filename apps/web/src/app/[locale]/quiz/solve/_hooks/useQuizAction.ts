'use client';

import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { useSolveQuizContext } from '@/app/[locale]/quiz/solve/_components/SolveQuizContext';
import type { QuizAnswer } from '@/app/[locale]/quiz/solve/_constants/solveQuiz.constants';
import {
  QUIZ_ANSWER,
  QUIZ_POINT_MAP,
  QUIZ_TOTAL_STAGE,
} from '@/app/[locale]/quiz/solve/_constants/solveQuiz.constants';

import type useQuizDialogStatus from './useQuizDialogStatus';

interface UseQuizActionProps {
  quizDialog: ReturnType<typeof useQuizDialogStatus>;
}

const useQuizAction = ({ quizDialog }: UseQuizActionProps) => {
  const { stage, setStage } = useSolveQuizContext();
  const { correctDialog, failDialog, completeDialog } = quizDialog;

  const submit = (answer: QuizAnswer) => {
    // FIXME:: API 연동 전까지 임시 코드
    const isCorrect = answer === QUIZ_ANSWER.YES;
    if (!isCorrect) {
      failDialog.open();
      return;
    }

    const isFinalStage = stage === QUIZ_TOTAL_STAGE;
    if (isFinalStage) {
      completeDialog.open();
      return;
    }

    correctDialog.open();
  };

  const router = useRouter();
  const terminateQuiz = () => {
    const currentPoint = QUIZ_POINT_MAP[stage - 1];

    toast.success(`Finished quiz. You got ${currentPoint}P!`);
    moveToQuizMain();
  };

  const moveToNextStage = () => {
    correctDialog.close();
    setStage(stage + 1);
  };

  const moveToQuizMain = () => {
    router.push('/quiz');
  };

  return {
    submit,
    terminateQuiz,
    moveToNextStage,
    moveToQuizMain,
  };
};

export default useQuizAction;
