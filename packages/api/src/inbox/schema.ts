import z from 'zod';

export const InboxTypeSchema = z.enum(['INBOX', 'NOTICE']);
export const InboxStatusSchema = z.enum(['READ', 'UNREAD']);

export const InboxSchema = z.object({
  id: z.string(),
  image: z.string(),
  title: z.string(),
  body: z.string(),
  redirectTo: z.string(),
  type: InboxTypeSchema,
  status: InboxStatusSchema,
  publishedAt: z.any(),
});

export type Inbox = z.infer<typeof InboxSchema>;
