import { z } from "zod"
export const createProjectSchema = z.object({
    title: z.string(),
    image: z.string().optional(),
    description: z.string(),
    techStack: z.array(z.string()),
    githubUrl: z.string().optional(),
    liveUrl: z.string().optional()
})