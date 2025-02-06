import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    email: v.string(),
    clerkUserId: v.string(),
    firstName: v.optional(v.string()),
    lastName: v.optional(v.string()),
    image: v.optional(v.string()),

    
  }).index("by_clerk_user_id", ["clerkUserId"]),
  stories: defineTable({
    prompt: v.string(),
    title: v.string(),
    slug: v.optional(v.string()),
    coverImageId: v.optional(v.id("_storage")),
    content: v.string(),
    no_of_words: v.number(),
    clerkUserId: v.string(),
    is_published: v.boolean(),
    is_public: v.boolean(),
  }).index("by_clerk_user_id", ["clerkUserId"])
    .index("by_slug", ["slug"]),
});
