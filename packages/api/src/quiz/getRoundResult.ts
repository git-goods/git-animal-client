import z from 'zod';
import { QuizResultSchema } from './schema';
import { QuizCommonHeader } from './quiz';
import { safeGet } from '../_instance/safe';

const GetRoundResultRequestSchema = z.object({
  contextId: z.string(),
});

const GetRoundResultResponseSchema = z.object({
  result: QuizResultSchema,
});

export type GetRoundResultRequest = z.infer<typeof GetRoundResultRequestSchema>;
export type GetRoundResultResponse = z.infer<typeof GetRoundResultResponseSchema>;

export const getRoundResult = async (
  request: GetRoundResultRequest & QuizCommonHeader,
): Promise<GetRoundResultResponse> => {
  return await safeGet(GetRoundResultResponseSchema)(`/quizs/context/${request.contextId}/results/result`, {
    headers: {
      Authorization: `Bearer ${request.token}`,
      Locale: request.language,
    },
  });
};
