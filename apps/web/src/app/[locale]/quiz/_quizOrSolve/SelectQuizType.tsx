'use client';

import React, { useState } from 'react';
import { css } from '_panda/css';

import QuizTypeCard from '@/app/[locale]/quiz/_quizOrSolve/QuizTypeCard';
import SolveQuizConfirmDialog from '@/app/[locale]/quiz/_quizOrSolve/SolveQuizConfirmDialog';

const QUIZ_REGISTER_POINT = 5000;
const QUIZ_SOLVE_MAXIMUM_POINT = 32000;

const SelectQuizType = () => {
  const [isSolveQuizConfirmDialogOpen, setIsSolveQuizConfirmDialogOpen] = useState(false);

  return (
    <div className={containerStyle}>
      <QuizTypeCard
        title="Create Quiz"
        description={`Create an O/X quiz and get ${QUIZ_REGISTER_POINT}P!`}
        image="/quiz/quiz-cat.webp"
        point={`${QUIZ_REGISTER_POINT}P`}
        onClick={() => {}}
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
        onConfirm={() => {}}
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
