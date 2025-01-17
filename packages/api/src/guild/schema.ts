import z from 'zod';

export const GuildLeaderSchema = z.object({
  userId: z.string(),
  name: z.string(),
  contributions: z.string(),
  personaId: z.string(),
  personaType: z.string(),
});

export type GuildLeader = z.infer<typeof GuildLeaderSchema>;

export const GuildMemberSchema = z.object({
  id: z.string(),
  userId: z.string(),
  name: z.string(),
  contributions: z.string(),
  personaId: z.string(),
  personaType: z.string(),
});

export type GuildMember = z.infer<typeof GuildMemberSchema>;

export const GuildSchema = z.object({
  id: z.string(),
  title: z.string(),
  body: z.string(),
  guildIcon: z.string(),
  leader: GuildLeaderSchema,
  farmType: z.string(),
  totalContributions: z.string(),
  members: z.array(GuildMemberSchema),
  waitMembers: z.array(GuildMemberSchema),
  createdAt: z.string(),
  autoJoin: z.any(),
});

export type Guild = z.infer<typeof GuildSchema>;
