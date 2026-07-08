'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { cn, Dialog } from '@gitanimals/ui-tailwind';
import { wrap } from '@suspensive/react';

import { Background } from '@/app/[locale]/game/quiz/_components/BackGround';
import QuizProgressBar from '@/app/[locale]/game/quiz/solve/_components/solving/QuizProgressBar';
import { QUIZ_ANSWER } from '@/app/[locale]/game/quiz/solve/_constants/solveQuiz.constants';
import { customScrollStyle } from '@/styles/scrollStyle';

import { customT } from '../../../_utils/quiz.intl';
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

    // correctDialog 의 onConfirm(다음 라운드 진행) 경로에서만 열리는 Dialog.Confirm 의 공용 onOpenChange 를 스킵하기 위한 플래그.
    // (challenge-button 확인 후에도 Dialog.Confirm 내부에서 onOpenChange(false) 가 호출되어, stop 로직과 중복 실행되는 것을 방지)
    const isMovingToNextStageRef = useRef(false);

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
        <Dialog.Confirm
          open={correctDialog.isOpen}
          onOpenChange={(open) => {
            if (open) return;

            if (isMovingToNextStageRef.current) {
              isMovingToNextStageRef.current = false;
              return;
            }

            stopQuiz().then(() => terminateQuiz());
          }}
          onConfirm={() => {
            isMovingToNextStageRef.current = true;
            moveToNextStage();
          }}
          title={t('correct-dialog.title')}
          description={t('correct-dialog.description')}
          confirmText={t('correct-dialog.challenge-button')}
          cancelText={customT(t('correct-dialog.stop-button'), { point: prize })}
        />
        <Dialog.Alert
          open={failDialog.isOpen}
          onOpenChange={(open) => !open && moveToQuizMain()}
          title={t('fail-dialog.title')}
          description={t('fail-dialog.description')}
          confirmText={t('fail-dialog.close-button')}
        />
        <Dialog.Alert
          open={completeDialog.isOpen}
          onOpenChange={(open) => !open && terminateQuiz()}
          title={t('complete-dialog.title')}
          description={customT(t('complete-dialog.description'), { point: prize })}
          confirmText={t('complete-dialog.close-button')}
        />
      </>
    );
  });

export default SolvingQuizSection;
