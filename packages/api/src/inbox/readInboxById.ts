// HTTP METHOD : DELETE
// url : https://api.gitanimals.org/inboxes/{inboxId}

import z from 'zod';
import { safeDel } from '../_instance/safe';

const ReadInboxByIdRequestSchema = z.object({
  inboxId: z.string(),
});

const ReadInboxByIdResponseSchema = z.any();

export type ReadInboxByIdRequest = z.infer<typeof ReadInboxByIdRequestSchema>;

export const readInboxById = (request: ReadInboxByIdRequest): Promise<void> => {
  return safeDel(ReadInboxByIdResponseSchema)(`/inboxes/${request.inboxId}`);
};
