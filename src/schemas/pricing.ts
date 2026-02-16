import { z } from 'zod';

export const pricingPlanSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(3).max(50),
  description: z.string().min(10).max(200),
  price: z.object({
    amount: z.number().min(0),
    currency: z.enum(['EUR', 'USD']),
    period: z.enum(['once', 'month', 'year']),
    display: z.string().min(2).max(20),
  }),
  features: z.array(z.object({
    text: z.string().min(5).max(200),
    included: z.boolean(),
    tooltip: z.string().optional(),
  })).min(3).max(15),
  popular: z.boolean().default(false),
  cta: z.object({
    text: z.string().min(5).max(30),
    link: z.string().url(),
  }),
  draft: z.boolean().optional().default(false),
  order: z.number().int().optional(),
});

export type PricingPlan = z.infer<typeof pricingPlanSchema>;
