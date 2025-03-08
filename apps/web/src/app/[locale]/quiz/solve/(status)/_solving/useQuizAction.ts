'use client';

import useQuizDialogStatus from '@/app/[locale]/quiz/solve/(status)/_solving/useQuizDialogStatus';
import {
  QUIZ_ANSWER,
  QuizAnswer,
  QUIZ_POINT_MAP,
  QUIZ_TOTAL_STAGE,
} from '@/app/[locale]/quiz/solve/solveQuiz.constants';
import { useSolveQuizContext } from '@/app/[locale]/quiz/solve/SolveQuizContext';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

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
