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
    const { submit, terminateQuiz, moveToNextStage, moveToQuizMain, stopQuiz } = quizAction;

    // round 바뀌면 타이머 정지 해제
    useEffect(() => {
      setIsRoundEnd(false);
    }, [round]);

    return (
      <>
        <Background />
        <div className="flex h-full w-full flex-1 flex-col overflow-hidden px-[16px] py-[40px]">
          <p className="glyph40-bold mb-[24px] [font-family:'Product_Sans'] font-bold text-white">
            Quiz {round.current}/{round.total}
          </p>
          <span className="glyph12-regular mb-[12px] w-fit rounded-[6px] bg-white-10 px-[12px] py-[6px] [font-family:'Product_Sans'] font-normal text-white-50">
            {t(level.toLowerCase())} {t('level')}
          </span>
          <p
            className={cn(
              'glyph16-regular h-full flex-1 shrink overflow-y-auto [font-family:\'Product_Sans\'] font-normal text-white-75',
              customScrollStyle,
            )}
          >
            {problem}
          </p>
          <div className="flex w-full shrink-0 flex-col">
            <p className="glyph15-bold mb-[12px] text-center [font-family:'Product_Sans'] font-bold text-white">
              {t('timer-mention')}
            </p>
            <QuizProgressBar timeoutAt={round.timeoutAt} onTimeout={failDialog.open} paused={isRoundEnd} />
            <div className="mt-[24px] flex gap-[8px]">
              <button
                className="flex h-[76px] w-full items-center justify-center rounded-[10px] border-[3px] border-solid border-white-75 bg-[linear-gradient(132.51deg,rgba(255,253,201,0.8)_2.19%,rgba(150,230,216,0.8)_49.24%,rgba(125,171,241,0.8)_98.21%)]"
                title="O"
                onClick={() => submit(QUIZ_ANSWER.YES)}
              >
                <Image src="/assets/game/quiz/ox_o.webp" alt="O" width={60} height={60} />
              </button>
              <button
                className="flex h-[76px] w-full items-center justify-center rounded-[10px] border-[3px] border-solid border-white-75 bg-[linear-gradient(132.51deg,rgba(255,253,201,0.8)_2.19%,rgba(150,230,216,0.8)_49.24%,rgba(125,171,241,0.8)_98.21%)]"
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
          onStop={async () => {
            await stopQuiz();
            await terminateQuiz();
          }}
          onConfirm={moveToNextStage}
          correctPoint={prize}
        />
        <FailAlertDialog isOpen={failDialog.isOpen} onClose={moveToQuizMain} />
        <CompleteAlertDialog isOpen={completeDialog.isOpen} onClose={terminateQuiz} completePoint={prize} />
      </>
    );
  });

export default SolvingQuizSection;
