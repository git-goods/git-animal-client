// Accept join guild
// {guildId}와 {userId}를 입력받아 가입 요청을 수락합니다.

// Request
// Http Method: POST
// url: https://render.gitanimals.org/guilds/{guildId}/accepts
// Request param
// user-id: 가입을 수락할 유저의 id

import z from 'zod';
import { renderPost } from '../_instance';

const AcceptJoinGuildRequest = z.object({
  userId: z.string(),
  guildId: z.string(),
});

export type AcceptJoinGuildRequest = z.infer<typeof AcceptJoinGuildRequest>;

export const acceptJoinGuild = async (request: AcceptJoinGuildRequest) => {
  const res = await renderPost(`/guilds/${request.guildId}/accepts?user-id=${request.userId}`);
  return res;
};
