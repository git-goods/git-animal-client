'use client';

import { answerQuiz, getRoundResult } from '@gitanimals/api';
import { toast } from 'sonner';

import type { QuizAnswer } from '../_constants/solveQuiz.constants';
import { useTranslation } from 'react-i18next';

import { QUIZ_RESULT } from '../../_constants/quiz.constants';
import { customT } from '../../_utils/quiz.intl';

import type useQuizDialogStatus from './useQuizDialogStatus';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/router/constants';

interface UseQuizActionProps {
  contextId: string;
  quizDialog: ReturnType<typeof useQuizDialogStatus>;
  prize: number;
  refetchQuiz: () => void;
}

const useQuizAction = ({ contextId, quizDialog, prize, refetchQuiz }: UseQuizActionProps) => {
  const { t, i18n } = useTranslation('quiz');

  const locale = i18n.language as 'en_US' | 'ko_KR';
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

  const navigate = useNavigate();
  const terminateQuiz = () => {
    toast.success(customT(t('quiz-finished'), { point: prize }));
    moveToQuizMain();
  };

  const moveToNextStage = () => {
    refetchQuiz();
    correctDialog.close();
  };

  const moveToQuizMain = () => {
    navigate(ROUTES.GAME.QUIZ.MAIN());
  };

  return {
    submit,
    terminateQuiz,
    moveToNextStage,
    moveToQuizMain,
  };
};

export default useQuizAction;
