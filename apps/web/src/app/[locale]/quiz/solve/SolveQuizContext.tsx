'use client';

import type { PropsWithChildren } from 'react';
import { createContext, useContext, useState } from 'react';

import { SOLVE_QUIZ_STATUS, type SolveQuizStatus } from '@/app/[locale]/quiz/solve/solveQuiz.constants';

interface SolveQuizContextProps {
  status: SolveQuizStatus;
  setStatus: (value: SolveQuizStatus) => void;
}

const SolveQuizContext = createContext<SolveQuizContextProps>({
  status: SOLVE_QUIZ_STATUS.NOT_STARTED,
  setStatus: () => {},
});

export const useSolveQuizContext = () => {
  const context = useContext(SolveQuizContext);
  if (!context) {
    throw new Error('useSolveQuiz must be used within a SolveQuiz');
  }
  return context;
};

export const SolveQuizProvider = ({ children }: PropsWithChildren) => {
  const [status, setStatus] = useState<SolveQuizStatus>(SOLVE_QUIZ_STATUS.NOT_STARTED);

  return <SolveQuizContext.Provider value={{ status, setStatus }}>{children}</SolveQuizContext.Provider>;
};
