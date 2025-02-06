import * as z from "zod";

export const editStorySchema = z.object({
    title: z.string().min(1, "Title is required"),
    content: z.string().min(1, "Content is required"),
    prompt: z.string().min(1, "Prompt is required"),
    is_public: z.boolean().default(false),
}
)