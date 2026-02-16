import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const services = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/services" }),
  schema: z.object({
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
    seo: z.object({
      title: z.string().min(1).max(60),
      description: z.string().min(1).max(160),
      canonical: z.string().url().optional(),
      noindex: z.boolean().optional().default(false),
      keywords: z.array(z.string()).max(10).optional(),
      image: z.string().optional(),
      imageAlt: z.string().min(5).max(100).optional(),
    }),
    faq: z.array(z.object({
      question: z.string().min(10).max(150),
      answer: z.string().min(20).max(500),
    })).min(2).max(6),
    draft: z.boolean().optional().default(false),
    order: z.number().int().optional(),
    lang: z.enum(['es', 'en']).default('es'),
  }),
});

const testimonials = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/testimonials" }),
  schema: z.object({
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
  }),
});

const pricing = defineCollection({
  loader: glob({ pattern: "**/*.json", base: "./src/content/pricing" }),
  schema: z.object({
    plans: z.array(z.object({
      id: z.string().min(1),
      name: z.string().min(3).max(50),
      description: z.string().min(10).max(200),
      price: z.object({
        amount: z.number().min(0),
        currency: z.enum(['EUR', 'USD']),
        period: z.enum(['once', 'month', 'year']),
        display: z.string().min(2).max(30),
      }),
      features: z.array(z.object({
        text: z.string().min(5).max(200),
        included: z.boolean().optional().default(true),
        tooltip: z.string().optional(),
      })).min(3).max(15),
      popular: z.boolean().default(false),
      cta: z.object({
        text: z.string().min(3).max(30),
        link: z.string().min(1),
      }),
      draft: z.boolean().optional().default(false),
      order: z.number().int().optional(),
    })).min(1).max(10),
  }),
});

export const collections = { services, testimonials, pricing };
