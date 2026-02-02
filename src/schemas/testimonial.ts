import { z } from 'zod';

export const testimonialSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(2).max(100),
  role: z.string().min(2).max(100),
  company: z.string().min(2).max(100),
  companyUrl: z.string().url().optional(),
  text: z.string().min(20).max(500),
  rating: z.number().int().min(1).max(5),
  image: z.string().min(1),
  imageAlt: z.string().min(5).max(100),
  date: z.coerce.date(),
  verified: z.boolean().default(true),
  source: z.enum(['google', 'linkedin', 'direct', 'other']).default('direct'),
  lang: z.enum(['es', 'en']).default('es'),
  draft: z.boolean().optional().default(false),
});

export type Testimonial = z.infer<typeof testimonialSchema>;
