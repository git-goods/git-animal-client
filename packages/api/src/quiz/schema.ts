import z from 'zod';

export const QuizLevelSchema = z.enum(['EASY', 'MEDIUM', 'DIFFICULT']);
export const QuizCategorySchema = z.enum(['FRONTEND', 'BACKEND']);
export const QuizStatusSchema = z.enum(['NOT_STARTED', 'SOLVING', 'SUCCESS', 'FAIL', 'DONE']);
export const QuizAnswerSchema = z.enum(['YES', 'NO']);
export const QuizResultSchema = z.enum(['SUCCESS', 'FAIL', 'NOT_STARTED', 'SOLVING']);
