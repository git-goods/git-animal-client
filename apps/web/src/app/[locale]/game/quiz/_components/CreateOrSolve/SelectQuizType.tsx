'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { wrap } from '@suspensive/react';

import { ROUTE } from '@/constants/route';
import { useRouter } from '@/i18n/routing';

import useTodayQuizData from '../../_hooks/useTodayQuizData';
import { customT } from '../../_utils/quiz.intl';

import QuizTypeCard from './QuizTypeCard';
import SolveQuizConfirmDialog from './SolveQuizConfirmDialog';

const QUIZ_REGISTER_POINT = 5000;

const SelectQuizType = wrap
  .ErrorBoundary({
    fallback: () => <></>,
  })
  .Suspense({ fallback: <></> })
  .on(function SelectQuizType() {
    const router = useRouter();
    const [isSolveQuizConfirmDialogOpen, setIsSolveQuizConfirmDialogOpen] = useState(false);
    const { isSolved, quizSolveCard } = useTodayQuizData();
    const t = useTranslations('Quiz');

    return (
      <div className="flex flex-col gap-2 w-full">
        <QuizTypeCard
          title={t('create-quiz-card-title')}
          description={customT(t('create-quiz-card-description'), { point: QUIZ_REGISTER_POINT })}
          image="/assets/game/quiz/quiz-cat.webp"
          point={`${QUIZ_REGISTER_POINT}P`}
          onClick={() => router.push(ROUTE.GAME.QUIZ.CREATE())}
        />
        <QuizTypeCard
          title={quizSolveCard.title}
          description={quizSolveCard.description}
          image="/assets/game/quiz/quiz-coin.webp"
          point={quizSolveCard.point}
          onClick={() => setIsSolveQuizConfirmDialogOpen(true)}
          isDisabled={isSolved}
        />
        <SolveQuizConfirmDialog
          isOpen={isSolveQuizConfirmDialogOpen}
          onConfirm={() => router.push(ROUTE.GAME.QUIZ.SOLVE())}
          onClose={() => setIsSolveQuizConfirmDialogOpen(false)}
        />
      </div>
    );
  });

export default SelectQuizType;
