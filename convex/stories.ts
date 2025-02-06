import { v } from "convex/values";
import { action, mutation, query } from "./_generated/server";
import { Story } from "../src/types/story";
import { generateCoverImage } from "../src/lib/services/story-gen";
import { userByExternalId } from "./users";
export const createStory = mutation({
  args: {
    title: v.string(),
    prompt: v.string(),
    no_of_words: v.number(),
    is_public: v.boolean(),
    slug: v.optional(v.string()),
    content: v.string(),
    coverImageId: v.optional(v.id("_storage")),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }

    // Create the story
    const storyId = await ctx.db.insert("stories", {
      title: args.title,
      prompt: args.prompt,
      no_of_words: args.no_of_words,
      is_public: args.is_public,
      slug: args.slug,
      content: args.content,
      is_published: args.is_public,
      coverImageId: args.coverImageId,
      clerkUserId: identity.subject,
    });

    return storyId;
  },
});

export const updateStory = mutation({
  args: {
    id: v.id("stories"),
    title: v.optional(v.string()),
    prompt: v.optional(v.string()),
    no_of_words: v.optional(v.number()),
    is_public: v.optional(v.boolean()),
    slug: v.optional(v.string()),
    content: v.optional(v.string()),
    coverImageId: v.optional(v.id("_storage")),
    is_published: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }

    const story = await ctx.db.get(args.id);

    if (!story) {
      throw new Error("Story not found");
    }

    if (story.clerkUserId !== identity.subject) {
      throw new Error("Unauthorized");
    }

    const updatedStory = await ctx.db.patch(args.id, {
      ...(args.title && { title: args.title }),
      ...(args.prompt && { prompt: args.prompt }),
      ...(args.no_of_words && { no_of_words: args.no_of_words }),
      ...(args.is_public !== undefined && { is_public: args.is_public }),
      ...(args.slug && { slug: args.slug }),
      ...(args.content && { content: args.content }),
      ...(args.coverImageId && { coverImageId: args.coverImageId }),
      ...(args.is_published !== undefined && {
        is_published: args.is_published,
      }),
    });

    return updatedStory;
  },
});

export const deleteStory = mutation({
  args: {
    id: v.id("stories"),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }

    const story = await ctx.db.get(args.id);

    if (!story) {
      throw new Error("Story not found");
    }

    if (story.clerkUserId !== identity.subject) {
      throw new Error("Unauthorized");
    }

    // Delete the story
    await ctx.db.delete(args.id);
    return true;
  },
});

export const getUserStories = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      return [];
    }

    const stories = await ctx.db
      .query("stories")
      .withIndex("by_clerk_user_id", (q) =>
        q.eq("clerkUserId", identity.subject)
      )
      .collect();

    const storiesWithImageUrls: Story[] = [];
    for (const story of stories) {
      if (story.coverImageId) {
        const imageUrl = (await ctx.storage.getUrl(story.coverImageId)) ?? "";
        storiesWithImageUrls.push({ ...story, imageUrl });
      } else {
        storiesWithImageUrls.push({ ...story, imageUrl: "" });
      }
    }
    return storiesWithImageUrls;
  },
});

//story by id
export const getStory = query({
  
  args: { id: v.id("stories") },
  handler: async (ctx, args) => {
    try {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }
    
    const story = await ctx.db.get(args.id);
    if (!story) {
      throw new Error("Story not found");
    }

    let imageUrl = "";
    if (story.coverImageId) {
      imageUrl = await ctx.storage.getUrl(story.coverImageId) ?? "";
    }

    let user = await userByExternalId(ctx, story.clerkUserId);
    if(!user){
      throw new Error("User not found for story");
    }
    return { ...story, imageUrl, author:user };
  } catch (error:any) {
    console.error(error);
    throw new Error("Error getting story");
  }
    

    
    
    
  }
});

export const getStoryBySlug = query({
  args: {
    slug: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }

    const stories = await ctx.db
      .query("stories")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .collect();

    if (stories.length === 0) {
      return null;
    }

    const story = stories[0];

    if (!story.is_public && story.clerkUserId !== identity.subject) {
      throw new Error("Unauthorized");
    }

    if (story.coverImageId) {
      const imageUrl = (await ctx.storage.getUrl(story.coverImageId)) ?? "";
      return { ...story, imageUrl };
    } else {
      return { ...story, imageUrl: "" };
    }
  },
});

export const sendCoverImage = action(
  async (ctx, { prompt }: { prompt: string }) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }

    const image = await generateCoverImage(prompt);
    const storageId = await ctx.storage.store(image as Blob);
    return storageId;
  }
);



//get all stories that are public and belongs to a different user

export const getPublicStories = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      return [];
    }

    let stories = await ctx.db
      .query("stories")
      
      .collect();
      stories = stories.filter((story:any) => story.is_public && story.clerkUserId !== identity.subject);

    const storiesWithImageUrls: Story[] = [];
    for (const story of stories) {
      if (story.coverImageId) {
        const imageUrl = (await ctx.storage.getUrl(story.coverImageId)) ?? "";
        storiesWithImageUrls.push({ ...story, imageUrl });
      } else {
        storiesWithImageUrls.push({ ...story, imageUrl: "" });
      }
    }
    return storiesWithImageUrls;
  },
});