export const QUIZ_LEVEL = {
  EASY: 'EASY',
  MEDIUM: 'MEDIUM',
  DIFFICULT: 'DIFFICULT',
} as const;
export type QuizLevel = (typeof QUIZ_LEVEL)[keyof typeof QUIZ_LEVEL];

export const QUIZ_CATEGORY = {
  FRONTEND: 'FRONTEND',
  BACKEND: 'BACKEND',
} as const;
export type QuizCategory = (typeof QUIZ_CATEGORY)[keyof typeof QUIZ_CATEGORY];

export const QUIZ_STATUS = {
  NOT_STARTED: 'NOT_STARTED',
  SOLVING: 'SOLVING',
  SUCCESS: 'SUCCESS',
  FAIL: 'FAIL',
  DONE: 'DONE',
} as const;
export type QuizStatus = (typeof QUIZ_STATUS)[keyof typeof QUIZ_STATUS];

export const QUIZ_ANSWER = {
  YES: 'YES',
  NO: 'NO',
} as const;

export const QUIZ_RESULT = {
  SUCCESS: 'SUCCESS',
  FAIL: 'FAIL',
} as const;
export type QuizResult = (typeof QUIZ_RESULT)[keyof typeof QUIZ_RESULT];
