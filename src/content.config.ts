import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const works = defineCollection({
  loader: glob({ base: "./src/content/works", pattern: "**/*.md" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      year: z.coerce.number(),
      type: z.enum(["film", "tv", "theatre"]),
      role: z.string().optional(),
      poster: image().optional(),
      slug: z.string().optional(),
      description: z.string().optional(),
      director: z.string().optional(),
      venue: z.string().optional(),
      draft: z.boolean().optional(),

      // existing
      episodes: z.array(
        z.object({
          n: z.number().optional(),
          url: z.string(),
          title: z.string().optional(),
        })
      ).optional(),

      // NEW
      films: z.number().optional(),          // e.g. number of films in a cycle/anthology
      // collections.ts
trailer: z.string().optional(),   // not .url()

    }),
});

const gallery = defineCollection({
  type: "data",
  schema: z.object({
    title: z.string(),
    workSlug: z.string().optional(),
    photos: z.array(
      z.object({
        image: z.string(),
        alt: z.string().optional(),
        caption: z.string().optional(),
        tags: z.array(z.string()).default([]),
      })
    ),
  }),
});

export const collections = { works, gallery };
