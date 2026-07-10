'use client';

import { useTranslations } from 'next-intl';
import { Dialog } from '@gitanimals/ui-tailwind';
import { wrap } from '@suspensive/react';
import { overlay } from 'overlay-kit';

import { ROUTE } from '@/constants/route';
import { useRouter } from '@/i18n/routing';

import useTodayQuizData from '../../_hooks/useTodayQuizData';
import { customT } from '../../_utils/quiz.intl';

import QuizTypeCard from './QuizTypeCard';

const QUIZ_REGISTER_POINT = 5000;

const SelectQuizType = wrap
  .ErrorBoundary({
    fallback: () => <></>,
  })
  .Suspense({ fallback: <></> })
  .on(function SelectQuizType() {
    const router = useRouter();
    const { isSolved, quizSolveCard } = useTodayQuizData();
    const t = useTranslations('Quiz');
    const tCommon = useTranslations('Common');

    const handleSolveQuiz = () => {
      overlay.open(({ isOpen, close }) => (
        <Dialog.Confirm
          open={isOpen}
          onOpenChange={(open) => !open && close()}
          onConfirm={() => {
            handleCheckLanguage();
            close();
          }}
          title={t('solve-todays-quiz')}
          description={t('solve-todays-quiz-description')}
          confirmText={tCommon('confirm')}
          cancelText={tCommon('close')}
        />
      ));
    };

    const handleCheckLanguage = () => {
      overlay.open(({ isOpen, close }) => (
        <Dialog.Confirm
          open={isOpen}
          onOpenChange={(open) => !open && close()}
          onConfirm={() => {
            router.push(ROUTE.GAME.QUIZ.SOLVE());
            close();
          }}
          title={t('check-language-for-quiz-dialog-title')}
          description={t('check-language-for-quiz-dialog-description')}
          confirmText={tCommon('confirm')}
          cancelText={tCommon('close')}
        />
      ));
    };

    return (
      <div className="flex flex-col gap-[8px] w-full">
        <QuizTypeCard
          title={t('create-quiz-card-title')}
          description={customT(t('create-quiz-card-description'), { point: QUIZ_REGISTER_POINT })}
          image="/assets/game/quiz/quiz-cat.webp"
          point={`${QUIZ_REGISTER_POINT}P`}
          onClick={() => router.push(ROUTE.GAME.QUIZ.CREATE())}
          isDisabled
          disabledLabel={t('prepare')}
        />
        <QuizTypeCard
          title={quizSolveCard.title}
          description={quizSolveCard.description}
          image="/assets/game/quiz/quiz-coin.webp"
          point={quizSolveCard.point}
          onClick={handleSolveQuiz}
          isDisabled={isSolved}
        />
      </div>
    );
  });

export default SelectQuizType;
