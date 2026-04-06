'use client';

import { useEffect, useState } from 'react';
import { wrap } from '@suspensive/react';
import { cn } from '@gitanimals/ui-tailwind/utils';

import { customScrollStyle } from '@/styles/scrollStyle';
import { Background } from '../../../_components/BackGround';
import useQuizAction from '../../_hooks/useQuizAction';
import useQuizData from '../../_hooks/useQuizData';
import useQuizDialogStatus from '../../_hooks/useQuizDialogStatus';
import { useTranslation } from 'react-i18next';
import QuizProgressBar from './QuizProgressBar';
import CorrectConfirmDialog from '../success/CorrectConfirmDialog';
import FailAlertDialog from '../fail/FailAlertDialog';
import CompleteAlertDialog from '../done/CompleteAlertDialog';
import { QUIZ_ANSWER } from '../../_constants/solveQuiz.constants';

interface Props {
  contextId: string;
}

const SolvingQuizSection = wrap
  .ErrorBoundary({
    fallback: () => <></>,
  })
  .Suspense({ fallback: <></> })
  .on(function SolvingQuizSection({ contextId }: Props) {
    const { t } = useTranslation('quiz');
    const { round, level, problem, refetchQuiz } = useQuizData({ contextId });

    const [isRoundEnd, setIsRoundEnd] = useState(false);
    const [prize, setPrize] = useState(0);
    const quizDialog = useQuizDialogStatus({ setPrize, setIsRoundEnd });
    const quizAction = useQuizAction({
      contextId,
      quizDialog,
      prize,
      refetchQuiz,
    });

    const { correctDialog, failDialog, completeDialog } = quizDialog;
    const { submit, terminateQuiz, moveToNextStage, moveToQuizMain } = quizAction;

    useEffect(() => {
      setIsRoundEnd(false);
    }, [round]);

    return (
      <>
        <Background />
        <div className="flex h-full w-full flex-1 flex-col overflow-hidden px-4 py-10">
          <p className="mb-6 font-product text-glyph-40 font-bold text-white">
            Quiz {round.current}/{round.total}
          </p>
          <span className="mb-3 w-fit rounded-md bg-white/10 px-3 py-1.5 font-product text-glyph-12 font-normal text-white/50">
            {t(level.toLowerCase())} {t('level')}
          </span>
          <p
            className={cn(
              'min-h-0 flex-1 shrink overflow-y-auto font-product text-glyph-16 font-normal text-white/75',
              customScrollStyle,
            )}
          >
            {problem}
          </p>
          <div className="flex w-full shrink-0 flex-col">
            <p className="mb-3 text-center font-product text-glyph-15 font-bold text-white">{t('timer-mention')}</p>
            <QuizProgressBar timeoutAt={round.timeoutAt} onTimeout={failDialog.open} paused={isRoundEnd} />
            <div className="mt-6 flex gap-2">
              <button
                className="flex h-[76px] w-full items-center justify-center rounded-[10px] border-[3px] border-white/75 bg-gradient-to-br from-[rgba(255,253,201,0.8)] via-[rgba(150,230,216,0.8)] to-[rgba(125,171,241,0.8)]"
                title="O"
                onClick={() => submit(QUIZ_ANSWER.YES)}
              >
                <img src="/assets/game/quiz/ox_o.webp" alt="O" width={60} height={60} />
              </button>
              <button
                className="flex h-[76px] w-full items-center justify-center rounded-[10px] border-[3px] border-white/75 bg-gradient-to-br from-[rgba(255,253,201,0.8)] via-[rgba(150,230,216,0.8)] to-[rgba(125,171,241,0.8)]"
                title="X"
                onClick={() => submit(QUIZ_ANSWER.NO)}
              >
                <img src="/assets/game/quiz/ox_x.webp" alt="X" width={60} height={60} />
              </button>
            </div>
          </div>
        </div>
        <CorrectConfirmDialog
          isOpen={correctDialog.isOpen}
          onClose={correctDialog.close}
          onStop={terminateQuiz}
          onConfirm={moveToNextStage}
          correctPoint={prize}
        />
        <FailAlertDialog isOpen={failDialog.isOpen} onClose={moveToQuizMain} />
        <CompleteAlertDialog isOpen={completeDialog.isOpen} onClose={terminateQuiz} completePoint={prize} />
      </>
    );
  });

export default SolvingQuizSection;
