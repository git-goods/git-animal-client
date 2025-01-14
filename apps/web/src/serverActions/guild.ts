import type { JoinGuildRequest } from '@gitanimals/api';
import { joinGuild } from '@gitanimals/api';

export async function joinGuildAction(request: JoinGuildRequest) {
  try {
    const res = await joinGuild(request);
    return res;
  } catch (error) {
    throw error;
  }
}
