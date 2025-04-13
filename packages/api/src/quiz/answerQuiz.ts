import z from 'zod';
import { QuizAnswerSchema } from './schema';
import { QuizCommonHeader } from './quiz';
import { safePost } from '../_instance/safe';

const AnswerQuizRequestSchema = z.object({
  contextId: z.string(),
  answer: QuizAnswerSchema,
});

const AnswerQuizResponseSchema = z.string();

export type AnswerQuizRequest = z.infer<typeof AnswerQuizRequestSchema>;
export type AnswerQuizResponse = z.infer<typeof AnswerQuizResponseSchema>;

export const answerQuiz = async (request: AnswerQuizRequest & QuizCommonHeader): Promise<AnswerQuizResponse> => {
  const { locale, contextId, answer } = request;

  return await safePost(AnswerQuizResponseSchema)(
    `/quizs/context/${contextId}/answers`,
    {
      answer,
    },
    {
      headers: {
        Locale: locale,
      },
    },
  );
};
