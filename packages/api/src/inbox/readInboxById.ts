// HTTP METHOD : DELETE
// url : https://api.gitanimals.org/inboxes/{inboxId}

import z from 'zod';
import { safeDel } from '../_instance/safe';

const ReadInboxByIdRequestSchema = z.object({
  inboxId: z.string(),
});

const ReadInboxByIdResponseSchema = z.void();

export type ReadInboxByIdRequest = z.infer<typeof ReadInboxByIdRequestSchema>;

export const readInboxById = async (request: ReadInboxByIdRequest): Promise<void> => {
  return await safeDel(ReadInboxByIdResponseSchema)(`/inboxes/${request.inboxId}`);
};
