import z from 'zod';
import { QuizLevelSchema, QuizCategorySchema, QuizStatusSchema } from './schema';
import { safeGet } from '../_instance/safe';
import { QuizCommonHeader } from './quiz';

const GetQuizRequestSchema = z.object({
  contextId: z.string(),
});

const GetQuizResponseSchema = z.object({
  round: z.object({
    total: z.number(),
    current: z.number(),
    timeoutAt: z.string(), // "YYYY-MM-DD HH:mm:ss"
  }),
  level: QuizLevelSchema,
  category: QuizCategorySchema,
  problem: z.string(),
  prize: z.number(),
  status: QuizStatusSchema,
});

export type GetQuizRequest = z.infer<typeof GetQuizRequestSchema>;
export type GetQuizResponse = z.infer<typeof GetQuizResponseSchema>;

export const getQuiz = async (request: GetQuizRequest & QuizCommonHeader): Promise<GetQuizResponse> => {
  return await safeGet(GetQuizResponseSchema)(`/quizs/context/${request.contextId}`, {
    headers: {
      Authorization: `Bearer ${request.token}`,
      Locale: request.language,
    },
  });
};
