import z from 'zod';
import { safePost } from '../_instance/safe';
import { QuizCategorySchema } from './schema';
import { QuizCommonHeader } from './quiz';

const CreateQuizContextRequestSchema = z.object({
  category: QuizCategorySchema,
});

const CreateQuizContextResponseSchema = z.object({
  contextId: z.string(),
});

export type CreateQuizContextRequest = z.infer<typeof CreateQuizContextRequestSchema>;
export type CreateQuizContextResponse = z.infer<typeof CreateQuizContextResponseSchema>;

export const createQuizContext = async (
  request: CreateQuizContextRequest & QuizCommonHeader,
): Promise<CreateQuizContextResponse> => {
  const { locale, ...data } = request;

  return await safePost(CreateQuizContextResponseSchema)('/quizs/context', data, {
    headers: {
      Locale: locale,
    },
  });
};
