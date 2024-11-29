import z from 'zod';

export const InboxTypeSchema = z.enum(['INBOX', 'NOTICE']);
export const InboxSchema = z.object({
  id: z.string(),
  image: z.string(),
  title: z.string(),
  body: z.string(),
  redirectTo: z.string(),
  type: InboxTypeSchema,
});

export type Inbox = z.infer<typeof InboxSchema>;
