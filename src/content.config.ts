import { defineCollection, z } from 'astro:content';

const oct2025Collection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string().optional(),
    slug: z.string().optional(),
    'page-type': z.string().optional(),
  }),
});

export const collections = {
  'oct-2025': oct2025Collection,
};
