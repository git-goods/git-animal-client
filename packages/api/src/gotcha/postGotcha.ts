import z from 'zod';
import { safePost } from '../_instance/safe';
import { CustomException } from '@gitanimals/exception/src/CustomException';
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

// 관측된 백엔드 실패가 10.2초에 응답한다 (gitanimals#507).
const GOTCHA_TIMEOUT_MS = 30_000;

// safePost 의 스키마 검증은 로깅만 한다. 통과시키면 UI 가 '뽑기를 진행중입니다'에서 닫히지 않는다.
export const parseGotchaResponse = (response: unknown): PostGotchaResponse => {
  const parsed = PostGotchaResponseSchema.safeParse(response);

  if (!parsed.success || parsed.data.gotchaResults.length === 0) {
    throw new CustomException('API_TYPE_NOT_MATCH', '뽑기 응답에 결과가 없습니다');
  }

  return parsed.data;
};

export const postGotcha = async (request?: PostGotchaRequest): Promise<PostGotchaResponse> => {
  const response = await safePost(PostGotchaResponseSchema)(
    `/gotchas?count=${request?.count}`,
    request ? convertCamelObjToKebab(request) : undefined,
    {
      headers: {
        'Api-Version': '3',
      },
      timeout: GOTCHA_TIMEOUT_MS,
    },
  );

  return parseGotchaResponse(response);
};
