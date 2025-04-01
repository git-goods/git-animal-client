import z from 'zod';
import { QuizAnswerSchema } from './schema';
import { QuizCommonHeader } from './quiz';
import { safePost } from '../_instance/safe';

const AnswerQuizRequestSchema = z.object({
  contextId: z.string(),
});

const AnswerQuizResponseSchema = z.object({
  answer: QuizAnswerSchema,
});

export type AnswerQuizRequest = z.infer<typeof AnswerQuizRequestSchema>;
export type AnswerQuizResponse = z.infer<typeof AnswerQuizResponseSchema>;

export const answerQuiz = async (request: AnswerQuizRequest & QuizCommonHeader): Promise<AnswerQuizResponse> => {
  const { locale, ...data } = request;

  return await safePost(AnswerQuizResponseSchema)(`/quizs/context/${request.contextId}/answers`, data, {
    headers: {
      Locale: locale,
    },
  });
};
