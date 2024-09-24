import z from 'zod';
import { safePost } from '../_instance/safe';
import { convertCamelObjToKebab } from '../utils';

const GotchaResultSchema = z.object({
  name: z.string(),
  ratio: z.string(),
});

const PostGotchaResponseSchema = z.object({
  gotchaResults: z.array(GotchaResultSchema),
});

const PostGotchaRequestSchema = z
  .object({
    gotchaType: z.string().optional(),
    count: z.number().optional(),
  })
  .optional();

export type GotchaResult = z.infer<typeof GotchaResultSchema>;
export type PostGotchaResponse = z.infer<typeof PostGotchaResponseSchema>;
export type PostGotchaRequest = z.infer<typeof PostGotchaRequestSchema>;

export const postGotcha = async (request?: PostGotchaRequest): Promise<PostGotchaResponse> => {
  return await safePost(PostGotchaResponseSchema)(`/gotchas`, request ? convertCamelObjToKebab(request) : undefined, {
    headers: {
      'Api-Version': '2',
    },
  });
};
