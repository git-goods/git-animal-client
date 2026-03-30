import z from 'zod';
import { safePost } from '../_instance/safe';
import { QuizCommonHeader } from './quiz';

const StopQuizContextRequestSchema = z.object({
  contextId: z.string(),
});

const StopQuizContextResponseSchema = z.void();

export type StopQuizContextRequest = z.infer<typeof StopQuizContextRequestSchema>;
export type StopQuizContextResponse = z.infer<typeof StopQuizContextResponseSchema>;

export const stopQuizContext = async (
  request: StopQuizContextRequest & QuizCommonHeader,
): Promise<StopQuizContextResponse> => {
  const { contextId, locale } = request;

  return await safePost(StopQuizContextResponseSchema)(
    `/quizs/context/${contextId}/stops`,
    {},
    {
      headers: {
        Locale: locale,
      },
    },
  );
};
