import { z } from 'zod';
import { seoSchema, type SeoData } from './seo';

export const serviceSchema = z.object({
  id: z.string().min(1),
  slug: z.string().regex(/^[a-z0-9-]+$/),
  title: z.string().min(5).max(100),
  description: z.string().min(20).max(300),
  shortDescription: z.string().min(10).max(150),
  price: z.object({
    amount: z.number().min(0),
    currency: z.enum(['EUR', 'USD']),
    period: z.enum(['once', 'month', 'year']).optional(),
  }),
  features: z.array(z.string().min(5).max(200)).min(3).max(10),
  icon: z.string().min(1),
  image: z.string().min(1),
  seo: seoSchema,
  faq: z.array(z.object({
    question: z.string().min(10).max(150),
    answer: z.string().min(20).max(500),
  })).min(2).max(6),
  draft: z.boolean().optional().default(false),
  order: z.number().int().optional(),
  lang: z.enum(['es', 'en']).default('es'),
});

export type Service = z.infer<typeof serviceSchema>;
