import z from 'zod';

export const PersonaSchema = z.object({
  id: z.string(),
  type: z.string(),
  level: z.string(),
  visible: z.boolean(),
  dropRate: z.string(),
});

export const PersonaInfoSchema = PersonaSchema.pick({
  type: true,
  dropRate: true,
});

export type Persona = z.infer<typeof PersonaSchema>;
export type PersonaInfo = z.infer<typeof PersonaInfoSchema>;

export const BackgroundSchema = z.object({
  type: z.string(),
});

export type Background = z.infer<typeof BackgroundSchema>;
