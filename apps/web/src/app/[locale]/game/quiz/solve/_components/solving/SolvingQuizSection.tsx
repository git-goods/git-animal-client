'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Button, cn, Dialog } from '@gitanimals/ui-tailwind';
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
        <Dialog open={correctDialog.isOpen} onOpenChange={(open) => !open && stopQuiz().then(() => terminateQuiz())}>
          <Dialog.Content
            className="flex w-full flex-col items-center gap-[12px]"
            isShowClose={false}
            onEscapeKeyDown={(e) => e.preventDefault()}
            onPointerDownOutside={(e) => e.preventDefault()}
          >
            <div className="flex w-full flex-col items-center gap-[12px]">
              <Dialog.Title className="!glyph24-bold !text-center [font-family:'Product_Sans'] font-bold">
                {t('correct-dialog.title')}
              </Dialog.Title>
              <Dialog.Description className="glyph16-regular text-center [font-family:'Product_Sans'] font-normal text-white-75 [word-break:keep-all]">
                {t('correct-dialog.description')}
              </Dialog.Description>
            </div>
            <Image
              className="my-[4px]"
              src="/assets/game/quiz/quiz-coin.svg"
              alt="quiz-coin"
              width={160}
              height={160}
              draggable={false}
            />
            <div className="flex w-full flex-col gap-[8px]">
              <Button className="w-full" onClick={moveToNextStage} variant="primary" size="m">
                {t('correct-dialog.challenge-button')}
              </Button>
              <Button
                className="w-full"
                onClick={() => stopQuiz().then(() => terminateQuiz())}
                variant="secondary"
                size="m"
              >
                {customT(t('correct-dialog.stop-button'), { point: prize })}
              </Button>
            </div>
          </Dialog.Content>
        </Dialog>
        <Dialog open={failDialog.isOpen} onOpenChange={(open) => !open && moveToQuizMain()}>
          <Dialog.Content
            className="flex w-full flex-col items-center gap-[12px]"
            isShowClose={false}
            onEscapeKeyDown={(e) => e.preventDefault()}
            onPointerDownOutside={(e) => e.preventDefault()}
          >
            <div className="flex w-full flex-col items-center gap-[12px]">
              <Dialog.Title className="!glyph24-bold !text-center [font-family:'Product_Sans'] font-bold">
                {t('fail-dialog.title')}
              </Dialog.Title>
              <Dialog.Description className="glyph16-regular text-center [font-family:'Product_Sans'] font-normal text-white-75 [word-break:keep-all]">
                {t('fail-dialog.description')}
              </Dialog.Description>
            </div>
            <div className="my-[4px] flex h-[160px] w-[160px] items-center justify-center">
              <Image
                src="/assets/game/quiz/cursor-unchoiced.webp"
                alt="quiz-failed"
                width={100}
                height={100}
                draggable={false}
              />
            </div>
            <div className="flex w-full">
              <Button className="w-full" onClick={moveToQuizMain} variant="secondary" size="m">
                {t('fail-dialog.close-button')}
              </Button>
            </div>
          </Dialog.Content>
        </Dialog>
        <Dialog open={completeDialog.isOpen} onOpenChange={(open) => !open && terminateQuiz()}>
          <Dialog.Content
            className="flex w-full flex-col items-center gap-[12px]"
            isShowClose={false}
            onEscapeKeyDown={(e) => e.preventDefault()}
            onPointerDownOutside={(e) => e.preventDefault()}
          >
            <div className="flex w-full flex-col items-center gap-[12px]">
              <Dialog.Title className="!glyph24-bold !text-center [font-family:'Product_Sans'] font-bold">
                {t('complete-dialog.title')}
              </Dialog.Title>
              <Dialog.Description className="glyph16-regular text-center [font-family:'Product_Sans'] font-normal text-white-75 [word-break:keep-all]">
                {customT(t('complete-dialog.description'), { point: prize })}
              </Dialog.Description>
            </div>
            <div className="my-[4px] flex h-[160px] w-[160px] items-center justify-center">
              <Image
                src="/assets/game/quiz/quiz-double-coin.webp"
                alt="quiz-complete"
                width={204}
                height={184}
                draggable={false}
              />
            </div>
            <div className="flex w-full">
              <Button className="w-full" onClick={terminateQuiz} variant="secondary" size="m">
                {t('complete-dialog.close-button')}
              </Button>
            </div>
          </Dialog.Content>
        </Dialog>
      </>
    );
  });

export default SolvingQuizSection;
