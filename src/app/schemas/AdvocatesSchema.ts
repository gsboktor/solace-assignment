import { z } from 'zod';

export const advocateSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  city: z.string().min(1),
  degree: z.string().min(1),
  specialties: z.array(z.string()),
  yearsOfExperience: z.number().int().positive(),
  phoneNumber: z.number().int().positive(),
});

export const advocatesResponseSchema = z.object({
  data: z.array(advocateSchema),
});

export type Advocate = z.infer<typeof advocateSchema>;
export type AdvocateResponse = z.infer<typeof advocatesResponseSchema>;
