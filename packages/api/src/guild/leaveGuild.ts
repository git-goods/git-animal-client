import z from 'zod';
import { renderDelete } from '../_instance';

const LeaveGuildRequestSchema = z.object({
  guildId: z.string(),
});

export type LeaveGuildRequest = z.infer<typeof LeaveGuildRequestSchema>;

export const leaveGuild = async (request: LeaveGuildRequest): Promise<void> => {
  return renderDelete(`/guilds/${request.guildId}/leave`);
};
