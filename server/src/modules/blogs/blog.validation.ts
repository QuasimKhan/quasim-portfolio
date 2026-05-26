import { z } from "zod";

const multilingualTextSchema = z.object({
    en: z.string().optional(),
    hi: z.string().optional(),
    ur: z.string().optional(),
    ru: z.string().optional(),
});

export const createBlogSchema = z.object({
    title: multilingualTextSchema,

    excerpt: multilingualTextSchema.optional(),

    content: multilingualTextSchema,

    coverImage: z.string().optional(),

    tags: z.array(z.string()).optional(),

    categories: z.array(z.string()).optional(),

    language: z.array(
        z.enum(["en", "hi", "ur", "ru"])
    ),
});


export const updateBlogSchema = createBlogSchema.partial()