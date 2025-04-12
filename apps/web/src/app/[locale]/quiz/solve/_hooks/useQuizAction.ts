'use client';

import { useLocale } from 'next-intl';
import { answerQuiz, getRoundResult } from '@gitanimals/api';
import { toast } from 'sonner';

import type { QuizAnswer } from '@/app/[locale]/quiz/solve/_constants/solveQuiz.constants';
import { ROUTE } from '@/constants/route';
import { type Locale, useRouter } from '@/i18n/routing';

import { QUIZ_RESULT } from '../../_constants/quiz.constants';

import type useQuizDialogStatus from './useQuizDialogStatus';

interface UseQuizActionProps {
  contextId: string;
  quizDialog: ReturnType<typeof useQuizDialogStatus>;
  round: {
    total: number;
    current: number;
  };
  prize: number;
  refetchQuiz: () => void;
}

const useQuizAction = ({ contextId, quizDialog, round, prize, refetchQuiz }: UseQuizActionProps) => {
  const locale = useLocale() as Locale;
  const { correctDialog, failDialog, completeDialog } = quizDialog;

  const submit = async (answer: QuizAnswer) => {
    try {
      await answerQuiz({
        contextId,
        locale,
        answer,
      });

      const { result, prize } = await getRoundResult({
        contextId,
        locale,
      });

      if (result === QUIZ_RESULT.FAIL) {
        failDialog.open();
        return;
      }

      const isFinalStage = round.current === round.total;
      if (isFinalStage) {
        completeDialog.open(prize);
        return;
      }

      correctDialog.open(prize);
    } catch (error) {
      console.error(error);
      failDialog.open();
    }
  };

  const router = useRouter();
  const terminateQuiz = () => {
    toast.success(`Finished quiz. You got ${prize}P!`);
    moveToQuizMain();
  };

  const moveToNextStage = () => {
    refetchQuiz();
    correctDialog.close();
  };

  const moveToQuizMain = () => {
    router.push(ROUTE.QUIZ.MAIN());
  };

  return {
    submit,
    terminateQuiz,
    moveToNextStage,
    moveToQuizMain,
  };
};

export default useQuizAction;
