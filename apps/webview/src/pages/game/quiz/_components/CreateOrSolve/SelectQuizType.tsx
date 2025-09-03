import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { css } from '_panda/css';
import { wrap } from '@suspensive/react';

import { ROUTES } from '@/router/constants';
import { useNavigate } from 'react-router-dom';

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
    const navigate = useNavigate();
    const [isSolveQuizConfirmDialogOpen, setIsSolveQuizConfirmDialogOpen] = useState(false);
    const { isSolved, quizSolveCard } = useTodayQuizData();
    const { t } = useTranslation('quiz');

    return (
      <div className={containerStyle}>
        <QuizTypeCard
          title={t('create-quiz-card-title')}
          description={customT(t('create-quiz-card-description'), { point: QUIZ_REGISTER_POINT })}
          image="/assets/game/quiz/quiz-cat.webp"
          point={`${QUIZ_REGISTER_POINT}P`}
          onClick={() => navigate(ROUTES.GAME.QUIZ.CREATE())}
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
          onConfirm={() => navigate(ROUTES.GAME.QUIZ.SOLVE())}
          onClose={() => setIsSolveQuizConfirmDialogOpen(false)}
        />
      </div>
    );
  });

export default SelectQuizType;

const containerStyle = css({
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
  width: '100%',
});
