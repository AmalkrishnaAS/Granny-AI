import * as z from "zod"

export const createStorySchema = z.object({
    title: z.string().min(1, "Title is required"),
    prompt: z.string().min(1, "Prompt is required"),
    no_of_words: z.number().min(1, "Number of pages is required"),
    is_public: z.boolean().default(false),
})
