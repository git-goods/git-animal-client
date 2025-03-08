export const SOLVE_QUIZ_STATUS = {
  NOT_STARTED: 'NOT_STARTED',
  SOLVING: 'SOLVING',
  SUCCESS: 'SUCCESS',
  FAIL: 'FAIL',
  DONE: 'DONE',
} as const;

export type SolveQuizStatus = (typeof SOLVE_QUIZ_STATUS)[keyof typeof SOLVE_QUIZ_STATUS];
