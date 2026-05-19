import { z } from "zod";

export const createBlogSchema =
    z.object({
        title: z.object({
            en: z.string().min(3),

            hi: z.string().optional(),

            ur: z.string().optional(),

            ru: z.string().optional(),
        }),

        excerpt: z.object({
            en: z.string().min(10),

            hi: z.string().optional(),

            ur: z.string().optional(),

            ru: z.string().optional(),
        }),

        content: z.object({
            en: z.string().min(20),

            hi: z.string().optional(),

            ur: z.string().optional(),

            ru: z.string().optional(),
        }),

        slug: z.string().min(3),

        tags: z.array(
            z.string()
        ),

        language: z.array(
            z.enum([
                "en",
                "hi",
                "ur",
                "ru",
            ])
        ),

        isPublished:
            z.boolean(),
    });

export type CreateBlogInput =
    z.infer<
        typeof createBlogSchema
    >;