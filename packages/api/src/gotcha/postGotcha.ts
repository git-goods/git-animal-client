import z from 'zod';
import { safePost } from '../_instance/safe';
import { convertCamelObjToKebab } from '../utils';

const GotchaResultSchema = z.object({
  name: z.string(),
  dropRate: z.string(),
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
  return await safePost(PostGotchaResponseSchema)(
    `/gotchas?count=${request?.count}`,
    request ? convertCamelObjToKebab(request) : undefined,
    {
      headers: {
        'Api-Version': '3',
      },
      // 서버는 saga 결과 대기 기본값 10초에 걸리면 500 을 준다(git-goods/gitanimals#507).
      // 150초는 게이트웨이가 커넥션을 물고 있을 때 화면이 2분 30초 잠기게 만들어 30초로 낮춘다.
      timeout: 30000,
    },
  );
};
