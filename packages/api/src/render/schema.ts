import z from 'zod';
export const PersonaGradeSchema = z.enum(['DEFAULT', 'EVOLUTION', 'COLLABORATOR']);

export const PersonaSchema = z.object({
  id: z.string(),
  type: z.string(),
  level: z.string(),
  visible: z.boolean(),
  dropRate: z.string(),
  grade: PersonaGradeSchema,
  isEvolution: z.boolean().optional(),
});

export const PersonaInfoSchema = PersonaSchema.pick({
  type: true,
  dropRate: true,
  grade: true,
});

export type Persona = z.infer<typeof PersonaSchema>;
export type PersonaInfo = z.infer<typeof PersonaInfoSchema>;

export const RenderBackgroundSchema = z.object({
  type: z.string(),
});

export type RenderBackground = z.infer<typeof RenderBackgroundSchema>;
