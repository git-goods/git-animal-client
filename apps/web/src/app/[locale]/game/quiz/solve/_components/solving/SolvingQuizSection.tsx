'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { cn } from '@gitanimals/ui-tailwind';
import { wrap } from '@suspensive/react';

import { Background } from '@/app/[locale]/game/quiz/_components/BackGround';
import CompleteAlertDialog from '@/app/[locale]/game/quiz/solve/_components/done/CompleteAlertDialog';
import FailAlertDialog from '@/app/[locale]/game/quiz/solve/_components/fail/FailAlertDialog';
import QuizProgressBar from '@/app/[locale]/game/quiz/solve/_components/solving/QuizProgressBar';
import CorrectConfirmDialog from '@/app/[locale]/game/quiz/solve/_components/success/CorrectConfirmDialog';
import { QUIZ_ANSWER } from '@/app/[locale]/game/quiz/solve/_constants/solveQuiz.constants';
import { customScrollStyle } from '@/styles/scrollStyle';

import useQuizAction from '../../_hooks/useQuizAction';
import useQuizData from '../../_hooks/useQuizData';
import useQuizDialogStatus from '../../_hooks/useQuizDialogStatus';

interface Props {
  contextId: string;
}

const SolvingQuizSection = wrap
  .ErrorBoundary({
    fallback: () => <></>,
  })
  .Suspense({ fallback: <></> })
  .on(function SolvingQuizSection({ contextId }: Props) {
    const t = useTranslations('Quiz');
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

    // round 바뀌면 타이머 정지 해제
    useEffect(() => {
      setIsRoundEnd(false);
    }, [round]);

    return (
      <>
        <Background />
        <div className="flex flex-col flex-1 w-full h-full p-[40px_16px] overflow-hidden">
          <p className="mb-6 font-product text-glyph-40 font-bold text-white">
            Quiz {round.current}/{round.total}
          </p>
          <span className="w-fit mb-3 p-[6px_12px] bg-white-10 rounded-md font-product text-glyph-12 font-normal text-white-50">
            {t(level.toLowerCase())} {t('level')}
          </span>
          <p
            className={cn(
              'flex-1 flex-shrink h-full font-product text-glyph-16 font-normal text-white-75 overflow-y-auto',
              customScrollStyle,
            )}
          >
            {problem}
          </p>
          <div className="flex flex-col flex-shrink-0 w-full">
            <p className="mb-3 font-product text-glyph-15 text-center font-bold text-white">{t('timer-mention')}</p>
            <QuizProgressBar timeoutAt={round.timeoutAt} onTimeout={failDialog.open} paused={isRoundEnd} />
            <div className="flex gap-2 mt-6">
              <button
                className="flex items-center justify-center w-full h-[76px] bg-[linear-gradient(132.51deg,rgba(255,253,201,0.8)_2.19%,rgba(150,230,216,0.8)_49.24%,rgba(125,171,241,0.8)_98.21%)] rounded-[10px] border-[3px] border-white-75"
                title="O"
                onClick={() => submit(QUIZ_ANSWER.YES)}
              >
                <Image src="/assets/game/quiz/ox_o.webp" alt="O" width={60} height={60} />
              </button>
              <button
                className="flex items-center justify-center w-full h-[76px] bg-[linear-gradient(132.51deg,rgba(255,253,201,0.8)_2.19%,rgba(150,230,216,0.8)_49.24%,rgba(125,171,241,0.8)_98.21%)] rounded-[10px] border-[3px] border-white-75"
                title="X"
                onClick={() => submit(QUIZ_ANSWER.NO)}
              >
                <Image src="/assets/game/quiz/ox_x.webp" alt="X" width={60} height={60} />
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
