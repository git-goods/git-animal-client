'use client';

import type { PropsWithChildren } from 'react';
import { createContext, useContext, useState } from 'react';

import { QUIZ_STATUS, type QuizStatus } from '@/app/[locale]/quiz/solve/_constants/solveQuiz.constants';

interface SolveQuizContextProps {
  status: QuizStatus;
  setStatus: (value: QuizStatus) => void;
  stage: number;
  setStage: (value: number) => void;
}

const SolveQuizContext = createContext<SolveQuizContextProps>({
  status: QUIZ_STATUS.NOT_STARTED,
  setStatus: () => {},
  stage: 1,
  setStage: () => {},
});

export const useSolveQuizContext = () => {
  const context = useContext(SolveQuizContext);
  if (!context) {
    throw new Error('useSolveQuiz must be used within a SolveQuiz');
  }
  return context;
};

export const SolveQuizProvider = ({ children }: PropsWithChildren) => {
  const [status, setStatus] = useState<QuizStatus>(QUIZ_STATUS.NOT_STARTED);
  const [stage, setStage] = useState<number>(1);

  return (
    <SolveQuizContext.Provider value={{ status, setStatus, stage, setStage }}>{children}</SolveQuizContext.Provider>
  );
};
