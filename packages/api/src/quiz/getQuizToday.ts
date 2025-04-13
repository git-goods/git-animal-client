import z from 'zod';
import { safeGet } from '../_instance/safe';
import { QuizResultSchema } from './schema';

const GetQuizTodayResponseSchema = z.object({
  isSolved: z.boolean(),
  contextId: z.string().nullable(),
  prize: z.number().nullable(),
  result: QuizResultSchema.nullable(),
});

export type GetQuizTodayResponse = z.infer<typeof GetQuizTodayResponseSchema>;

export const getQuizToday = async (): Promise<GetQuizTodayResponse> => {
  return await safeGet(GetQuizTodayResponseSchema)(`/quizs/context/today`);
};
