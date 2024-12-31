'use server';

import type { JoinGuildRequest } from '@gitanimals/api';
import { joinGuild } from '@gitanimals/api';

export async function joinGuildAction(request: JoinGuildRequest) {
  return joinGuild(request);
}
