import z from 'zod';
import { safeGet } from '../_instance/safe';
import { InboxSchema } from './schema';

const GetAllUnreadInboxResponseSchema = z.object({
  inboxes: z.array(InboxSchema),
});

type GetAllUnreadInboxResponse = z.infer<typeof GetAllUnreadInboxResponseSchema>;

export const getAllUnreadInbox = (): Promise<GetAllUnreadInboxResponse> => {
  return safeGet(GetAllUnreadInboxResponseSchema)('/inboxes');
};
