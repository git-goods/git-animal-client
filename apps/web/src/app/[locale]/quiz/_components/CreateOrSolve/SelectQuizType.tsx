'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { css } from '_panda/css';

import QuizTypeCard from './QuizTypeCard';
import SolveQuizConfirmDialog from './SolveQuizConfirmDialog';

const QUIZ_REGISTER_POINT = 5000;
const QUIZ_SOLVE_MAXIMUM_POINT = 32000;

const SelectQuizType = () => {
  const router = useRouter();
  const [isSolveQuizConfirmDialogOpen, setIsSolveQuizConfirmDialogOpen] = useState(false);

  return (
    <div className={containerStyle}>
      <QuizTypeCard
        title="Create Quiz"
        description={`Create an O/X quiz and get ${QUIZ_REGISTER_POINT}P!`}
        image="/quiz/quiz-cat.webp"
        point={`${QUIZ_REGISTER_POINT}P`}
        onClick={() => {
          router.push('/quiz/create');
        }}
      />
      <QuizTypeCard
        title="Solve quiz"
        description={`Solve random quiz and get up to ${QUIZ_SOLVE_MAXIMUM_POINT}P! You can only try once a day.`}
        image="/quiz/quiz-coin.webp"
        point={`Up to ${QUIZ_SOLVE_MAXIMUM_POINT}P`}
        onClick={() => setIsSolveQuizConfirmDialogOpen(true)}
      />
      <SolveQuizConfirmDialog
        isOpen={isSolveQuizConfirmDialogOpen}
        onConfirm={() => router.push('/quiz/solve')}
        onClose={() => setIsSolveQuizConfirmDialogOpen(false)}
      />
    </div>
  );
};

export default SelectQuizType;

const containerStyle = css({
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
  width: '100%',
});
