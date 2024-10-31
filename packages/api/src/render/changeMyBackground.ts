import z from 'zod';
import { safeRenderPut } from '../_instance/safe';
import { BackgroundSchema } from './schema';

const ChangeMyBackgroundRequestSchema = BackgroundSchema;
const ChangeMyBackgroundResponseSchema = z.any(); // TODO: 준영이와 이야기해서 응답값 정의하기

export type ChangeMyBackgroundRequest = z.infer<typeof ChangeMyBackgroundRequestSchema>;
export type ChangeMyBackgroundResponse = z.infer<typeof ChangeMyBackgroundResponseSchema>;

export const changeMyBackground = (request: ChangeMyBackgroundRequest) =>
  safeRenderPut(ChangeMyBackgroundResponseSchema)(`/users/backgrounds`, request);

// TODO: intercepter에서 넣을 수 있도록 변경하기
export const changeMyBackgroundByToken = (request: ChangeMyBackgroundRequest, token: string) => {
  return safeRenderPut(ChangeMyBackgroundResponseSchema)(`/users/backgrounds`, request, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
