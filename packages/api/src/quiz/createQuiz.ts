import z from 'zod';
import { safePost } from '../_instance/safe';
import { QuizAnswerSchema, QuizCategorySchema, QuizLevelSchema, QuizResultSchema } from './schema';
import { QuizCommonHeader } from './quiz';

const CreateQuizRequestSchema = z.object({
  level: QuizLevelSchema,
  category: QuizCategorySchema,
  problem: z.string(),
  expectedAnswer: QuizAnswerSchema,
});

const CreateQuizResponseSchema = z.object({
  result: QuizResultSchema,
  point: z.number(),
  message: z.string(),
});

export type CreateQuizRequest = z.infer<typeof CreateQuizRequestSchema>;
export type CreateQuizResponse = z.infer<typeof CreateQuizResponseSchema>;

export const createQuiz = async (request: CreateQuizRequest & QuizCommonHeader): Promise<CreateQuizResponse> => {
  return await safePost(CreateQuizResponseSchema)('/quizs', request, {
    headers: {
      Authorization: `Bearer ${request.token}`,
      Locale: request.language,
    },
  });
};
