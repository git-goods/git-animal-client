import z from 'zod';
import { safePost } from '../_instance/safe';
import { QuizCommonHeader } from './quiz';

const StopContextRequestSchema = z.object({
  contextId: z.string(),
});

const StopContextResponseSchema = z.void();

export type StopContextRequest = z.infer<typeof StopContextRequestSchema>;
export type StopContextResponse = z.infer<typeof StopContextResponseSchema>;

export const stopContext = async (request: StopContextRequest & QuizCommonHeader): Promise<StopContextResponse> => {
  return await safePost(StopContextResponseSchema)(`/quizs/context/${request.contextId}/stops`, request, {
    headers: {
      Authorization: `Bearer ${request.token}`,
      Locale: request.locale,
    },
  });
};
