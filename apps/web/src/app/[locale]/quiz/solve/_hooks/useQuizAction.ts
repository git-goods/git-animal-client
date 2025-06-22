'use client';

import { useLocale, useTranslations } from 'next-intl';
import { answerQuiz, getRoundResult } from '@gitanimals/api';
import { toast } from 'sonner';

import type { QuizAnswer } from '@/app/[locale]/quiz/solve/_constants/solveQuiz.constants';
import { ROUTE } from '@/constants/route';
import { type Locale, useRouter } from '@/i18n/routing';

import { QUIZ_RESULT } from '../../_constants/quiz.constants';
import { customT } from '../../_utils/quiz.intl';

import type useQuizDialogStatus from './useQuizDialogStatus';

interface UseQuizActionProps {
  contextId: string;
  quizDialog: ReturnType<typeof useQuizDialogStatus>;
  prize: number;
  refetchQuiz: () => void;
}

const useQuizAction = ({ contextId, quizDialog, prize, refetchQuiz }: UseQuizActionProps) => {
  const t = useTranslations('Quiz');
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

      switch (result) {
        case QUIZ_RESULT.FAIL:
          failDialog.open();
          break;
        case QUIZ_RESULT.SUCCESS:
          correctDialog.open(prize);
          break;
        case QUIZ_RESULT.DONE:
          completeDialog.open(prize);
          break;
      }
    } catch (error) {
      console.error(error);
      failDialog.open();
    }
  };

  const router = useRouter();
  const terminateQuiz = () => {
    toast.success(customT(t('quiz-finished'), { point: prize }));
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
