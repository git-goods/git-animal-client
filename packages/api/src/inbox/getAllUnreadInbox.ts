// url : https://api.gitanimals.org/inboxes
// method : GET

import z from 'zod';
import { safeGet } from '../_instance/safe';

const InboxTypeSchema = z.enum(['INBOX', 'NOTICE']);
const InboxSchema = z.object({
  id: z.string(),
  image: z.string(),
  title: z.string(),
  body: z.string(),
  redirectTo: z.string(),
  type: InboxTypeSchema,
});

const GetAllUnreadInboxResponseSchema = z.array(InboxSchema);
export type Inbox = z.infer<typeof InboxSchema>;
export type GetAllUnreadInboxResponse = z.infer<typeof GetAllUnreadInboxResponseSchema>;

export const getAllUnreadInbox = (): Promise<GetAllUnreadInboxResponse> => {
  return safeGet(GetAllUnreadInboxResponseSchema)('/inboxes');
};
